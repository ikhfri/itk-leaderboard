/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Toast from "@/components/ui/toast";
import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

import useTimer from "@/components/timer/use-timer";
import TimerDisplay from "@/components/timer/timer-display";
import TimerControls from "@/components/timer/timer-controls";

import LeaderboardList from "@/components/leaderboard/leaderboard-list";

type Variant = "ai" | "devops" | "network";

interface Props {
  booth: "AI/GUESS_AI" | "DEVOPS/PORT_CHECKER" | "NETWORK/PIN_CONNECTION";
  challenge: "GUESS_AI" | "PORT_CHECKER" | "PIN_CONNECTION";
  title: string;

  description: string;

  variant: Variant;

  scoreLabel: string;
  scoreField: "score" | "connectedPins";
}

export default function BoothPage({
  booth,
  title,
  description,
  variant,
  challenge,
  scoreLabel,
  scoreField,
}: Props) {
  const [name, setName] = useState("");

  const [score, setScore] = useState(0);

  const [results, setResults] = useState([]);

  const [mode, setMode] = useState<"stopwatch" | "countdown">("stopwatch");

  const [countdownTime, setCountdownTime] = useState(60);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const timer = useTimer({
    mode,

    initialTime: mode === "countdown" ? countdownTime : 0,
  });

  const fetchLeaderboard = async () => {
    const response = await fetch(
      `/api/leaderboard/${booth.toLowerCase()}/${challenge.toLowerCase()}`,
    );

    const data = await response.json();

    setResults(data);
  };

  useEffect(() => {
    fetchLeaderboard();

    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 3000);

    return () => clearInterval(interval);
  }, [booth]);

  useEffect(() => {
    timer.reset();
  }, [mode, countdownTime]);

  const handleSave = async () => {
    if (!name) {
      setToast({
        visible: true,
        message: "Nama wajib diisi",
        type: "error",
      });

      setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 3000);

      return;
    }

    let duration = timer.time;

    if (mode === "countdown") {
      duration = countdownTime - timer.time;
    }

    const payload: any = {
      name,

      booth,

      timerMode: mode === "stopwatch" ? "STOPWATCH" : "COUNTDOWN",

      duration,
      challenge,

      countdownStart: mode === "countdown" ? countdownTime : null,
    };

    payload[scoreField] = score;

    const response = await fetch("/api/results", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setToast({
        visible: true,
        message: "Gagal menyimpan data",
        type: "error",
      });

      setTimeout(() => {
        setToast((prev) => ({
          ...prev,
          visible: false,
        }));
      }, 3000);

      return;
    }

    setToast({
      visible: true,
      message: "Data berhasil disimpan!",
      type: "success",
    });

    setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 3000);
    setName("");

    setScore(0);

    timer.reset();

    fetchLeaderboard();
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-black">{title}</h1>

                <p className="text-slate-500 mt-2">{description}</p>
              </div>

              <div>
                <label className="font-semibold">Nama Peserta</label>

                <Input
                  placeholder="Masukkan nama..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="font-semibold">Mode Timer</label>

                <div className="flex gap-4 mt-3">
                  <Button
                    variant={variant}
                    onClick={() => setMode("stopwatch")}
                  >
                    Stopwatch
                  </Button>

                  <Button variant="devops" onClick={() => setMode("countdown")}>
                    Countdown
                  </Button>
                </div>
              </div>

              {mode === "countdown" && (
                <div>
                  <label className="font-semibold">
                    Countdown Duration (detik)
                  </label>

                  <Input
                    type="number"
                    min={1}
                    value={countdownTime}
                    onChange={(e) => setCountdownTime(Number(e.target.value))}
                    className="mt-2"
                  />

                  <div className="flex flex-wrap gap-3 mt-4">
                    {[30, 60, 120, 300].map((item) => (
                      <button
                        key={item}
                        onClick={() => setCountdownTime(item)}
                        className="
                            px-4 py-2
                            rounded-xl
                            bg-slate-100
                            hover:bg-slate-200
                            transition-all
                            font-semibold
                          "
                      >
                        {item}s
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <TimerDisplay
                time={timer.time}
                isDanger={mode === "countdown" && timer.time <= 10}
              />

              <TimerControls
                onStart={timer.start}
                onPause={timer.pause}
                onReset={timer.reset}
              />

              <div>
                <label className="font-semibold">{scoreLabel}</label>

                <Input
                  type="number"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="mt-2"
                />
              </div>

              <Button variant={variant} onClick={handleSave}>
                SAVE DATA
              </Button>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold">LIVE LEADERBOARD</h2>

              <LeaderboardList results={results} />
            </div>
          </Card>
        </div>
      </div>
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </main>
  );
}
