import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
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
  }, [targetTime, isExpired])

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className='flex font-bold text-xl'>
        {isExpired ? titleExpired : title}
      </div>

      <div className={
        classNames('flex gap-2 md:gap-4 select-none w-full', {
          'opacity-50 cursor-not-allowed': isExpired
        })
      }>
        {
          Object.entries(timeObj).map(obj => (
            <div
              key={obj[0]}
              className="flex flex-1 flex-col p-2 bg-neutral rounded-box text-neutral-content">
              <span className="font-mono text-2xl md:text-5xl">
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

Counter.propTypes = {
  isClosed: PropTypes.bool,
  title: PropTypes.string,
  titleExpired: PropTypes.string,
  targetTime: PropTypes.object,
}

export default Counter;
