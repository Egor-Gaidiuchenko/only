import React from 'react';

type Props = {
  startDate: number;
  endDate: number;
  startRef: React.RefObject<HTMLParagraphElement>;
  endRef: React.RefObject<HTMLParagraphElement>;
};

export default function DateRange({ startDate, endDate, startRef, endRef }: Props) {
  return (
    <div className="range">
      <p className="range_start" ref={startRef}>{startDate}</p>
      <p className="range_end" ref={endRef}>{endDate}</p>
    </div>
  );
}

