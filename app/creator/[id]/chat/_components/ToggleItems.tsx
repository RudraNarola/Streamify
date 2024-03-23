"use client";

import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream";

interface Props {
  label: string;
  checked: boolean;
  field: string;
}

const ToggleItems = ({ label, checked, field }: Props) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !checked })
        .then(() => toast.success("Chat settings updated successfully"))
        .catch(() => toast.error("Failed to update chat settings"));
    });
  };

  return (
    <>
      <div className="rounded-xl bg-muted p-6 w-full">
        <div className="flex items-center justify-between">
          <p className="font-semibold shrink-0">{label}</p>
          <div className="space-y-2">
            <Switch
              checked={checked}
              onCheckedChange={onChange}
              disabled={isPending}
            >
              {checked ? "On" : "Off"}
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleItems;
