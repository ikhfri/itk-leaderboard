"use client";

import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  message: string;

  type?: "success" | "error";

  visible: boolean;
}

export default function Toast({ message, type = "success", visible }: Props) {
  if (!visible) return null;

  return (
    <div
      className={`
        fixed
        top-6
        right-6
        z-50

        min-w-[320px]

        rounded-3xl
        border
        backdrop-blur-xl
        shadow-2xl

        px-6
        py-5

        transition-all
        animate-in
        slide-in-from-top

        ${
          type === "success"
            ? `
              border-emerald-200
              bg-emerald-100/80
            `
            : `
              border-red-200
              bg-red-100/80
            `
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div>
          {type === "success" ? (
            <CheckCircle2 className="text-emerald-500" size={28} />
          ) : (
            <XCircle className="text-red-500" size={28} />
          )}
        </div>

        <div>
          <p className="font-bold text-lg">
            {type === "success" ? "Success" : "Error"}
          </p>

          <p className="text-slate-600">{message}</p>
        </div>
      </div>
    </div>
  );
}
