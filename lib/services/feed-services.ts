import { db } from "@/lib/database"

import { getCurrentUser } from "./user.services";

export const getStreams = async () => {
    let userId;
    try {
        const user = await getCurrentUser();
        userId = user.id;


    }
    catch {
        userId = null;
    }


    let streams = [];

    if (userId) {
        //load by user Id
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedId: userId
                            }
                        }
                    }
                }
            },


           
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl : true,
            },
            orderBy: [{
                isLive: "desc",
            },

            {
                updatedAt: "desc",
            }
            ],

        });



    }
    else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailUrl : true,
            },
            orderBy: [{
                isLive: "desc",
            },

            {
                updatedAt: "desc",
            }
            ]
        });

    }
    return streams;
}