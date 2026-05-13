"use client";

import { useEffect, useState } from "react";

interface Props {
  mode: "stopwatch" | "countdown";
  initialTime?: number;
}

export default function useTimer({ mode, initialTime = 0 }: Props) {
  const [time, setTime] = useState(initialTime);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (mode === "stopwatch") {
            return prev + 1;
          }

          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const start = () => setIsRunning(true);

  const pause = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    setTime,
  };
}
