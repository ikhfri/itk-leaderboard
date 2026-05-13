interface Props {
  time: number;
  isDanger?: boolean;
}

export default function TimerDisplay({ time, isDanger }: Props) {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (time % 60).toString().padStart(2, "0");

  return (
    <div
      className={`
        text-7xl md:text-8xl
        font-black
        tracking-widest
        text-center
        transition-all
        ${isDanger ? "text-red-500 animate-pulse" : "text-cyan-500"}
      `}
    >
      {minutes}:{seconds}
    </div>
  );
}
