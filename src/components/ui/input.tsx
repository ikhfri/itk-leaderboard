import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition-all focus:border-cyan-400 focus:ring-4 focus:ring-cyan-200",
        className,
      )}
      {...props}
    />
  );
}
