/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import Card from "@/components/ui/card";

import LeaderboardList from "@/components/leaderboard/leaderboard-list";

interface Props {
  booth: string;
  title: string;
}

export default function BoothLeaderboard({ booth, title }: Props) {
  const [results, setResults] = useState([]);

  const fetchLeaderboard = async () => {
    const response = await fetch(`/api/leaderboard/${booth}`);

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

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-4xl">
        <Card className="p-8">
          <h1 className="text-5xl font-black mb-8">{title}</h1>

          <LeaderboardList results={results} />
        </Card>
      </div>
    </main>
  );
}
