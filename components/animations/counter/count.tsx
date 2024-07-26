import React, { useEffect } from 'react';
import './Counter.css';

interface CounterProps {
  icon: React.ReactNode;
  endValue: number;
  text: string;
}

const Counter: React.FC<CounterProps> = ({ icon, endValue, text }) => {
  useEffect(() => {
    const valueDisplays = document.querySelectorAll(".num");
    let interval = 3000;

    valueDisplays.forEach((valueDisplay) => {
      let startValue = 0;
      let endValue = parseInt(valueDisplay.getAttribute("data-val")!);
      let duration = Math.floor(interval / endValue);
      let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = `+${startValue}`;
        if (startValue === endValue) {
          clearInterval(counter);
        }
      }, duration);
    });
  }, [endValue]);

  return (
    <div className="counter-container">
      {icon}
      <span className="num" data-val={endValue.toString()}>+0</span>
      <span className="text">{text}</span>
    </div>
  );
};

export default Counter;
