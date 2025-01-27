import { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();
  const formattedDate = currentTime.toLocaleDateString();

  return (
    <div className="text-sm text-gray-600 text-right sm:text-left md:text-center">
      <div className="font-medium">{formattedTime}</div>
      <div className="text-gray-500">{formattedDate}</div>
    </div>
  );
};

export default DateTimeDisplay;
