import Button from "@/components/ui/button";

interface Props {
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export default function TimerControls({ onStart, onPause, onReset }: Props) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Button variant="ai" onClick={onStart}>
        START
      </Button>

      <Button variant="devops" onClick={onPause}>
        PAUSE
      </Button>

      <Button variant="network" onClick={onReset}>
        RESET
      </Button>
    </div>
  );
}
