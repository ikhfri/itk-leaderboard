import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className }: Props) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-white/30 bg-white/50 backdrop-blur-xl shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
