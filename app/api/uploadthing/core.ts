import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/services/user.services";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const self = await getCurrentUser();
      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await db.stream.update({
        where: {
          id: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
