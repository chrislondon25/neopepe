"use client";

import { useEffect, useState } from "react";

const targetTime = new Date().getTime() + 48 * 60 * 60 * 1000;

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetTime - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 48);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="text-4xl font-bold text-white">
      {hours}h {minutes}m {seconds}s
    </div>
  );
}
