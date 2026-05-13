"use client";

import { useState } from "react";

import Card from "@/components/ui/card";
import Toast from "@/components/ui/toast";

export default function ClearDataPage() {
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      visible: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 3000);
  };

  const handleClear = async (booth: "AI" | "DEVOPS" | "NETWORK" | "ALL") => {
    const confirmClear = confirm(
      booth === "ALL"
        ? "Hapus SEMUA leaderboard?"
        : `Hapus leaderboard ${booth}?`,
    );

    if (!confirmClear) return;

    const response = await fetch("/api/results/clear", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        booth,
      }),
    });

    if (!response.ok) {
      showToast("Gagal menghapus data", "error");

      return;
    }

    showToast("Leaderboard berhasil dihapus", "success");
  };

  return (
    <>
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-4xl">
          <Card className="p-10">
            <div className="flex flex-col gap-8">
              <div>
                <h1 className="text-5xl font-black">CLEAR DATA</h1>

                <p className="text-slate-500 mt-3">Reset leaderboard booth</p>
              </div>

              <div className="grid gap-5">
                {/* AI */}
                <button
                  onClick={() => handleClear("AI")}
                  className="
                    rounded-3xl
                    bg-linear-to-r
                    from-cyan-400
                    to-purple-500
                    px-6
                    py-5
                    text-left
                    text-white
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
                  "
                >
                  <p className="text-2xl font-black">CLEAR AI</p>

                  <p className="opacity-80">Hapus leaderboard AI</p>
                </button>

                {/* DEVOPS */}
                <button
                  onClick={() => handleClear("DEVOPS")}
                  className="
                    rounded-3xl
                    bg-linear-to-r
                    from-orange-400
                    to-red-500
                    px-6
                    py-5
                    text-left
                    text-white
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
                  "
                >
                  <p className="text-2xl font-black">CLEAR DEVOPS</p>

                  <p className="opacity-80">Hapus leaderboard DevOps</p>
                </button>

                {/* NETWORK */}
                <button
                  onClick={() => handleClear("NETWORK")}
                  className="
                    rounded-3xl
                    bg-linear-to-r
                    from-blue-500
                    to-cyan-500
                    px-6
                    py-5
                    text-left
                    text-white
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
                  "
                >
                  <p className="text-2xl font-black">CLEAR NETWORK</p>

                  <p className="opacity-80">Hapus leaderboard Network</p>
                </button>

                {/* ALL */}
                <button
                  onClick={() => handleClear("ALL")}
                  className="
                    mt-4
                    rounded-3xl
                    border-2
                    border-red-300
                    bg-red-100
                    px-6
                    py-5
                    text-left
                    shadow-xl
                    transition-all
                    hover:scale-[1.02]
                  "
                >
                  <p
                    className="
                      text-2xl
                      font-black
                      text-red-500
                    "
                  >
                    CLEAR ALL
                  </p>

                  <p className="text-red-400">Hapus semua leaderboard</p>
                </button>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </>
  );
}
