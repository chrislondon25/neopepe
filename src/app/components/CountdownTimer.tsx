import { useEffect, useState } from "react";

type CountdownTimerProps = {
  date_end: string;
};

export default function CountdownTimer({ date_end }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endTime = parseInt(date_end);

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [date_end]);

  return (
    <div className="banner1-timer">
      <ul className="presale-end-time orbitron">
        <li className="days">
          {String(timeLeft.days).padStart(2, "0")}
          <span>d</span>
        </li>
        <li className="hours">
          {String(timeLeft.hours).padStart(2, "0")}
          <span>h</span>
        </li>
        <li className="minutes">
          {String(timeLeft.minutes).padStart(2, "0")}
          <span>m</span>
        </li>
        <li className="seconds">
          {String(timeLeft.seconds).padStart(2, "0")}
          <span>s</span>
        </li>
      </ul>
    </div>
  );
}
