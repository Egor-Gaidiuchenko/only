import React from 'react';

type Props = {
  historicDates: { title: string }[];
  currentEvent: number;
  loadThis: (index: number) => void;
  angle: number;
  timeOfRotation: number;
  mainCircleRef: React.RefObject<HTMLDivElement>;
};

export default function Spinner({ historicDates, currentEvent, loadThis, angle, timeOfRotation, mainCircleRef }: Props) {
  const numberOfEvents = historicDates.length;

  return (
    <div className="historic-dates__spinner spinner">
      <div
        ref={mainCircleRef}
        className="spinner__main-circle"
        style={{
          "--count": numberOfEvents,
          "--angle": `${angle}deg`,
          "--time": `${timeOfRotation}ms`,
          "--delay": `${timeOfRotation + 300}ms`,
        } as React.CSSProperties}
      >
        {historicDates.map((item, index) => {
          const idx = index + 1;
          return (
            <div
              key={index}
              className={`spinner__shoulder ${currentEvent === index ? 'spinner__shoulder_active' : ''}`}
              style={{ "--i": idx } as React.CSSProperties}
              onClick={() => loadThis(index)}
            >
              <div className="spinner__circle-area">
                <p className="spinner__circle">
                  {idx}
                  <span className="spinner__title">{item.title}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
