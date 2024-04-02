"use server";
import { currentUser } from "@clerk/nextjs";
import { db } from "../database";

export const getCurrentUser = async () => {
  const clerkUser = await currentUser();


  if (!clerkUser || !clerkUser.username) {
    throw new Error("User not authenticated (Clerk)");
  }

  const clerkId = clerkUser.id;

  const user = await db.user.findUnique({
    where: {
      externalId: clerkId,
    },
  });

  if (!user) {
    throw new Error("User no found (Database)");
  }

  return user;
};

export const getUserByUsername = async (userName: string) => {
  const user = await db.user.findUnique({
    where: {
      username: userName,
    },
    select: {
      id: true,
      externalId: true,
      username: true,
      bio: true,
      imageUrl: true,


      stream: {
        select: {
          id: true,


          isLive: true,
          isChatDelayed: true,
          isChatEnabled: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
          name: true,

        }
      },

      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  });

  // if (!user) {
  //   throw new Error("User not found");
  // }

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      stream: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserByExternalId = async (externalId: string) => {
  const user = await db.user.findUnique({
    where: {
      externalId,
    },
    include: {
      stream: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

// function also exist in follow.services
export const getFollowedChannel = async () => {
  const result = await db.user.findMany();
  return result;
};

export const getRecommendedChannel = async () => {
  // const user = await getCurrentUser();

  let userId;

  try {
    const self = await getCurrentUser();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId,
                },
              },
            },
          },
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          }
        },
        {
          createdAt: "desc"
        },
      ]
    })
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      orderBy: [
        {
          stream: {
            isLive: "desc",
          }
        },
        {
          createdAt: "desc"
        },
      ]
    });
  }

  return users;


 



  


  

  
  




 



  




  
};
