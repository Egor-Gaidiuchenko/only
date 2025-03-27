import React from 'react';

type Props = {
  total: string;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export default function NavigationPanel({ total, onPrev, onNext, isFirst, isLast }: Props) {
  return (
    <div className="historic-dates__navigation navigation">
      <p className="navigation__total">{total}</p>
      <div className="navigation__buttons control-buttons">
        <button className="control-buttons__default control-buttons__prev" onClick={onPrev} disabled={isFirst} />
        <button className="control-buttons__default control-buttons__next" onClick={onNext} disabled={isLast} />
      </div>
    </div>
  );
}
