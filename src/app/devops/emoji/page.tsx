/* eslint-disable react-hooks/immutability */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useMemo, useState } from "react";

import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Toast from "@/components/ui/toast";

import LeaderboardList from "@/components/leaderboard/leaderboard-list";

import { emojiQuestions } from "@/data/emoji-questions";

export default function EmojiQuizPage() {
  const [name, setName] = useState("");

  const [started, setStarted] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(10);

  const [totalTime, setTotalTime] = useState(0);

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // RANDOM QUESTION FIX
  const questions = useMemo(() => {
    return [...emojiQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [started]);

  const question = questions[currentQuestion];

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
    }, 1500);
  };

  // FETCH LEADERBOARD
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

  // COUNTDOWN
  useEffect(() => {
    if (!started) return;

    if (timeLeft <= 0) {
      handleNextQuestion();

      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);

      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, started]);

  // START
  const handleStart = () => {
    if (!name) {
      showToast("Nama wajib diisi", "error");

      return;
    }

    setStarted(true);
  };

  // RESET
  const resetQuiz = () => {
    setStarted(false);

    setCurrentQuestion(0);

    setAnswer("");

    setScore(0);

    setTimeLeft(10);

    setTotalTime(0);

    setLoading(false);

    setName("");
  };

  // NEXT
  const handleNextQuestion = async () => {
    if (loading) return;

    setLoading(true);

    const isCorrect =
      answer.toLowerCase().trim() === question.answer.toLowerCase().trim();

    const updatedScore = isCorrect ? score + 1 : score;

    if (isCorrect) {
      setScore(updatedScore);

      showToast("Jawaban benar!", "success");
    }

    setAnswer("");

    // FINISH
    if (currentQuestion >= questions.length - 1) {
      const finalScore = updatedScore * 1000 - totalTime;

      try {
        await fetch("/api/results", {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,

            booth: "DEVOPS",

            challenge: "EMOJI",

            timerMode: "QUIZ",

            duration: totalTime,

            score: updatedScore,

            correctAnswers: updatedScore,

            totalQuestions: questions.length,

            finalScore,
          }),
        });

        showToast("Quiz selesai!", "success");

        fetchLeaderboard();
      } catch (error) {
        console.log(error);

        showToast("Gagal save score", "error");
      }

      // balik ke home
      setTimeout(() => {
        resetQuiz();
      }, 1500);

      return;
    }

    setCurrentQuestion((prev) => prev + 1);

    setTimeLeft(10);

    setLoading(false);
  };

  // ENTER
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNextQuestion();
    }
  };

  // HOME SCREEN
  if (!started) {
    return (
      <>
        <main className="min-h-screen p-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* LEFT */}
              <Card className="p-10">
                <div className="flex flex-col gap-6">
                  <div>
                    <h1
                      className="
                        text-6xl
                        font-black
                      "
                    >
                      DEVOPS EMOJI
                    </h1>

                    <p
                      className="
                        text-slate-500
                        mt-3
                      "
                    >
                      Tebak tools DevOps dari emoji
                    </p>
                  </div>

                  <Input
                    placeholder="Nama peserta..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Button variant="devops" onClick={handleStart}>
                    START QUIZ
                  </Button>
                </div>
              </Card>

              {/* RIGHT */}
              <Card className="p-10">
                <div className="flex flex-col gap-6">
                  <div>
                    <h2
                      className="
                        text-4xl
                        font-black
                      "
                    >
                      LEADERBOARD
                    </h2>

                    <p
                      className="
                        text-slate-500
                        mt-2
                      "
                    >
                      Top peserta emoji
                    </p>
                  </div>

                  <LeaderboardList results={results} />
                </div>
              </Card>
            </div>
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

  // QUIZ SCREEN
  return (
    <>
      <main
        className="
          min-h-screen
          flex
          items-center
          justify-center
          p-6
        "
      >
        <Card
          className="
            w-full
            max-w-3xl
            p-10
          "
        >
          <div
            className="
              flex
              flex-col
              gap-8
            "
          >
            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p className="text-slate-500">Question</p>

                <h2
                  className="
                    text-4xl
                    font-black
                  "
                >
                  {currentQuestion + 1}
                  {" / "}
                  {questions.length}
                </h2>
              </div>

              <div
                className={`
                  rounded-3xl
                  px-6
                  py-4
                  text-4xl
                  font-black

                  ${
                    timeLeft <= 3
                      ? `
                        bg-red-100
                        text-red-500
                        animate-pulse
                      `
                      : `
                        bg-orange-100
                        text-orange-500
                      `
                  }
                `}
              >
                {timeLeft}
              </div>
            </div>

            {/* EMOJI */}
            <div
              className="
                rounded-3xl
                bg-slate-100
                p-16
                text-center
                text-8xl
                shadow-inner
              "
            >
              {question.emoji}
            </div>

            {/* INPUT */}
            <Input
              placeholder="Jawaban..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            {/* BUTTON */}
            <Button
              variant="devops"
              onClick={handleNextQuestion}
              disabled={loading}
            >
              NEXT
            </Button>

            {/* SCORE */}
            <div className="text-center">
              <p className="text-slate-500">Score</p>

              <p
                className="
                  text-5xl
                  font-black
                "
              >
                {score}
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </>
  );
}
