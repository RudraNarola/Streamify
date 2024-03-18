"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState, useTransition, useRef, ElementRef } from "react";
import { updateStream } from "@/actions/stream";
import toast from "react-hot-toast";
import { UploadDropzone } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const router = useRouter();

  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: name })
        .then(() => {
          toast.success("Stream Updated");
        })
        .then(() => {
          closeRef.current?.click();
        })
        .catch(() => {
          toast.error("Something Went Wrong!");
        });
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" size="sm" className="ml-auto">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Stream Info</DialogTitle>
          </DialogHeader>
          <form className="space-y-14" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                placeholder="Stream Name"
                onChange={onChange}
                value={name}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail</Label>
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(res) => {
                    setThumbnailUrl(res?.[0]?.url);
                    router.refresh();
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <DialogClose asChild ref={closeRef}>
                <Button variant="ghost" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant={"primary"} type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
