"use client";

import { Crown, Medal, Timer, Trophy } from "lucide-react";

interface Result {
  id: string;

  name: string;

  score?: number;

  connectedPins?: number;

  duration: number;

  timerMode?: string;

  finalScore: number;
  correctAnswers?: number;

  totalQuestions?: number;
}

interface Props {
  results: Result[];
}

export default function LeaderboardList({ results }: Props) {
  const getRankIcon = (index: number) => {
    if (index === 0) {
      return (
        <div
          className="
            flex items-center justify-center
            w-14 h-14
            rounded-2xl
            bg-yellow-400/20
            text-yellow-500
          "
        >
          <Crown size={28} />
        </div>
      );
    }

    if (index === 1) {
      return (
        <div
          className="
            flex items-center justify-center
            w-14 h-14
            rounded-2xl
            bg-slate-300/30
            text-slate-500
          "
        >
          <Medal size={28} />
        </div>
      );
    }

    if (index === 2) {
      return (
        <div
          className="
            flex items-center justify-center
            w-14 h-14
            rounded-2xl
            bg-orange-300/20
            text-orange-500
          "
        >
          <Trophy size={28} />
        </div>
      );
    }

    return (
      <div
        className="
          flex items-center justify-center
          w-14 h-14
          rounded-2xl
          bg-slate-100
          text-slate-600
          font-bold
          text-lg
        "
      >
        #{index + 1}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5">
      {results.length === 0 && (
        <div
          className="
            rounded-3xl
            border border-dashed
            border-slate-300
            p-10
            text-center
            text-slate-500
          "
        >
          Belum ada data leaderboard
        </div>
      )}

      {results.map((item, index) => {
        const value =
          item.score !== undefined ? item.score : (item.connectedPins ?? 0);

        return (
          <div
            key={item.id}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              p-5
              transition-all
              hover:scale-[1.02]
              hover:shadow-2xl

              ${
                index === 0
                  ? `
                    border-yellow-300
                    bg-linear-to-r
                    from-yellow-100
                    to-yellow-50
                  `
                  : index === 1
                    ? `
                    border-slate-300
                    bg-linear-to-r
                    from-slate-100
                    to-slate-50
                  `
                    : index === 2
                      ? `
                    border-orange-200
                    bg-linear-to-r
                    from-orange-100
                    to-orange-50
                  `
                      : `
                    border-white/40
                    bg-white/60
                    backdrop-blur-xl
                  `
              }
            `}
          >
            {/* glow */}
            <div
              className="
                absolute
                inset-0
                opacity-0
                group-hover:opacity-100
                transition-all
                bg-linear-to-r
                from-cyan-200/20
                to-purple-200/20
              "
            />

            <div className="relative z-10 flex items-center justify-between gap-4">
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {getRankIcon(index)}

                <div>
                  <h3
                    className="
                      text-2xl
                      font-black
                      tracking-tight
                    "
                  >
                    {item.name}
                  </h3>

                  <div
                    className="
                      flex items-center gap-2
                      mt-1
                      text-slate-500
                    "
                  >
                    <Timer size={16} />

                    <span>{item.duration} detik</span>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right">
                <p
                  className="
                    text-4xl
                    font-black
                    bg-linear-to-r
                    from-cyan-500
                    to-purple-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  {value}
                </p>

                <p className="text-slate-500 font-medium">
                  {item.correctAnswers !== undefined
                    ? `${item.correctAnswers}/${item.totalQuestions}`
                    : item.score !== undefined
                      ? "Score"
                      : "Pins"}
                </p>
                <p
                  className="
    mt-2
    text-sm
    font-semibold
    text-slate-600
  "
                >
                  Final Score: {item.finalScore}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
