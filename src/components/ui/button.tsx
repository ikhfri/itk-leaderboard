import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "ai" | "devops" | "network";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  children,
  className,
  variant = "ai",
  ...props
}: Props) {
  const variants: Record<Variant, string> = {
    ai: "from-cyan-400 to-purple-500",
    devops: "from-orange-400 to-red-500",
    network: "from-blue-500 to-cyan-500",
  };

  return (
    <button
      className={clsx(
        "rounded-3xl px-6 py-4 text-white font-bold shadow-xl transition-all hover:scale-105 active:scale-95 bg-linear-to-r",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
