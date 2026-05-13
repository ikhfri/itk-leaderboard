/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/card";

import LeaderboardList from "@/components/leaderboard/leaderboard-list";

export default function Page() {
  const [results, setResults] = useState([]);

  const fetchLeaderboard = async () => {
    const response = await fetch("/api/leaderboard/devops/emoji");

    const data = await response.json();

    setResults(data);
  };

  useEffect(() => {
    fetchLeaderboard();

    const interval = setInterval(() => {
      fetchLeaderboard();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl">
        <Card className="p-10">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-6xl font-black">DEVOPS EMOJI</h1>

              <p className="text-slate-500 mt-3">Leaderboard Tebak Emoji</p>
            </div>

            <LeaderboardList results={results} />
          </div>
        </Card>
      </div>
    </main>
  );
}
