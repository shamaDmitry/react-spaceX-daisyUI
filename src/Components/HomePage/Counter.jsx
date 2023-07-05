import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const Counter = ({ isClosed, title, titleExpired, targetTime }) => {
  const textMap = {
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
  }
  const [timeObj, setTimeObj] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(isClosed);

  const getCountDownTime = (targetTime) => {
    const timeNow = new Date().getTime() / 1000;
    const secondsLeft = targetTime - timeNow < 0 ? 0 : targetTime - timeNow;

    if (secondsLeft === 0) {
      setIsExpired(true)
    }

    const days = secondsLeft / 86400
    const hours = (secondsLeft / 3600) % 24;
    const minutes = (secondsLeft / 60) % 60;
    const seconds = secondsLeft % 60;

    return {
      days: Math.floor(days),
      hours: Math.floor(hours),
      minutes: Math.floor(minutes),
      seconds: Math.floor(seconds)
    }
  }

  useEffect(() => {
    if (!targetTime) return;
    if (isExpired) return;

    setTimeObj(getCountDownTime(targetTime));

    const timer = setInterval(() => {
      setTimeObj(
        getCountDownTime(targetTime)
      )
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [targetTime])

  return (
    <div className="flex flex-col items-center gap-4 mb-8 text-centers">
      <div className='flex justify-center font-bold text-xl'>
        {isExpired ? titleExpired : title}
      </div>

      <div className={
        classNames('inline-flex gap-4 select-none', {
          'opacity-50 cursor-not-allowed': isExpired
        })
      }>
        {
          Object.entries(timeObj).map(obj => (
            <div
              key={obj[0]}
              className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-5xl">
                {obj[1] < 10 ? `0${obj[1]}` : obj[1]}
              </span>

              <span className="font-bold text-center text-xs text-inherit">
                {textMap[obj[0]]}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Counter;
