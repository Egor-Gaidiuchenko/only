import React from 'react';

type Props = {
  count: number;
  current: number;
  onClick: (index: number) => void;
};

export default function EventDots({ count, current, onClick }: Props) {
  return (
    <div className="events__control-buttons">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`events__button ${current === index ? 'events__button_active' : ''}`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
