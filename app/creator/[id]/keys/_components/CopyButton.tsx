"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface Props {
  value: string | null;
}

const CopyButton = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <>
      <Button
        onClick={onCopy}
        disabled={!value || isCopied}
        variant="ghost"
        size="sm"
      >
        <Icon className="h-4 w-4" />
      </Button>
    </>
  );
};

export default CopyButton;
