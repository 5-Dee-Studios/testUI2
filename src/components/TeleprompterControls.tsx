import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TeleprompterControlsProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
  onExit: () => void;
  onRestart: () => void;
}

export const TeleprompterControls = ({
  isPlaying,
  speed,
  onTogglePlay,
  onSpeedChange,
  onExit,
  onRestart,
}: TeleprompterControlsProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed top-8 left-8 z-[100] flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="nav-button"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="fixed top-8 right-8 z-[100]">
        <button
          onClick={onExit}
          className="nav-button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="affirmations-controls">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRestart}
          className="w-10 h-10 rounded-full hover:bg-[#785340]/10"
        >
          <RotateCcw className="h-5 w-5 text-[#785340]" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onTogglePlay}
          className="w-12 h-12 rounded-full hover:bg-[#785340]/10"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 text-[#785340]" />
          ) : (
            <Play className="h-6 w-6 text-[#785340]" />
          )}
        </Button>

        <div className="flex items-center gap-4 px-4">
          <span className="text-sm text-[#785340] font-medium">
            {speed.toFixed(1)}x
          </span>
          <div className="w-32">
            <Slider
              value={[speed]}
              min={0.5}
              max={2}
              step={0.1}
              onValueChange={([value]) => onSpeedChange(value)}
              className="[&_[role=slider]]:bg-[#785340]"
            />
          </div>
          <div className="flex flex-col items-center text-xs text-[#785340]/60 gap-1">
            <span>↑ Faster</span>
            <span>↓ Slower</span>
          </div>
        </div>
      </div>
    </>
  );
};