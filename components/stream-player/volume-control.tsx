"use client";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";

interface VolumeControlProps {
  volume: number;
  onToggle: () => void;
  onVolumeChange: (volume: number) => void;
}

export const VolumeControl = ({
  volume,
  onToggle,
  onVolumeChange,
}: VolumeControlProps) => {
  const isMuted = volume === 0;
  const isAboveHalf = volume > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="text-white hover:bg-white/10 p-1.5 rounded-lg"
      >
        <Icon className="h-6 w-6" />
      </button>
      <Slider
        className="w-[8rem] cursor-pointer"
        value={[volume]}
        min={0}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
      />
    </div>
  );
};
