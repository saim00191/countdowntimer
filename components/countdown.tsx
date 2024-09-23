"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Button } from "../components/ui/button";

export default function Countdown() {
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    const numericDuration = typeof duration === "number" ? duration : Number(duration);
    if (numericDuration > 0) {
      setTimeLeft(numericDuration);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      alert("Please enter a positive number.");
    }
  };

  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-orange-400 to-yellow-500 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800">
      <div className="bg-gradient-to-r from-yellow-200 to-orange-100 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded p-8 w-full max-w-md shadow-orange-900">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-yellow-200 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <input
            type="number"
            id="duration"
            placeholder="Enter Time in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="rounded border-gray-300 dark:bg-gray-900 dark:text-gray-200 p-3 w-8/12 text-left shadow-lg focus:outline-none focus:ring focus:ring-yellow-500"
          />
          <Button
            onClick={handleSetDuration}
            variant={"outline"}
            className="ml-4 text-white bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded text-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-yellow-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-white bg-gradient-to-r from-green-400 to-green-600 p-3 rounded text-lg shadow-lg hover:bg-green-500 hover:shadow-xl"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-white bg-gradient-to-r from-blue-400 to-blue-600 p-3 rounded text-lg shadow-lg hover:bg-blue-500 hover:shadow-xl"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-white bg-gradient-to-r from-red-400 to-red-600 p-3 rounded text-lg shadow-lg hover:bg-red-500 hover:shadow-xl"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}