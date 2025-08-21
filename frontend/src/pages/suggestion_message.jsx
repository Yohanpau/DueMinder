import React, { useEffect, useState } from 'react';

const Suggestion = ({ message, animateOut, duration = 10000 }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

  return (
    <div className="relative">
      <div
        className={`absolute top-[0em] left-[4.5em] bg-[#FFF6F2] text-[#111111] px-4 py-3 rounded-2xl shadow-xl max-w-[270px] text-sm z-50 border border-[#FE7531] 
        ${animateOut ? 'animate-fade-out' : 'animate-fade-in'}
        before:content-[''] before:absolute before:-left-3 before:top-3 before:border-[6px] before:border-transparent before:border-r-[#FFF6F2] before:z-0`}
      >
        {message}
      </div>
    </div>
  );
};


export default Suggestion;

