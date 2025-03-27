import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { historicDates } from '../../constants/historic-dates';
import DateRange from '../../components/DateRange/DateRange';
import NavigationPanel from '../../components/NavigationPanel/NavigationPanel';
import EventDots from '../../components/EventDots/EventDots';
import Spinner from '../../components/Spinner/Spinner';
import EventsSlider from '../../components/EventsSlider/EventsSlider';
import './main-page.scss'

export default function MainPage() {
  const numberOfEvents = historicDates.length;
  const angleBetweenDots = 360 / numberOfEvents;
  const defaultTimeOfRotation = 300;

  const sliderRef = useRef<HTMLDivElement>(null);
  const mainCircleRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLParagraphElement>(null);
  const endDateRef = useRef<HTMLParagraphElement>(null);

  const [angle, setAngle] = useState(angleBetweenDots);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [timeOfRotation, setTimeOfRotation] = useState(defaultTimeOfRotation);
  const [startDate, setStartDate] = useState(Number(historicDates[0].events[0].date));
  const [endDate, setEndDate] = useState(Number(historicDates[0].events[historicDates.length - 1].date));

  useEffect(() => {
    const timer = setTimeout(() => {
      sliderRef.current?.classList.add('slider_show');
      clearTimeout(timer);
    }, 300);
  }, [currentEvent]);

  const getTotal = () => `${String(currentEvent + 1).padStart(2, '0')}/${String(numberOfEvents).padStart(2, '0')}`;

  const fadeIt = (fn: () => void) => {
    sliderRef.current?.classList.remove('slider_show');
    const timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
    }, 300);
  };

  const animateDatesRange = (index: number) => {
    const newStartDate = Number(historicDates[index].events[0].date);
    const newEndDate = Number(historicDates[index].events[historicDates.length - 1].date);
    const startRange = newStartDate - startDate;
    const endRange = newEndDate - endDate;
    const animationTime = (timeOfRotation + 300) / 1000;

    gsap.to(startDateRef.current, {
      duration: animationTime,
      textContent: `+=${startRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setStartDate(newStartDate)
    });
    gsap.to(endDateRef.current, {
      duration: animationTime,
      textContent: `+=${endRange}`,
      roundProps: "textContent",
      ease: "none",
      onUpdate: () => setEndDate(newEndDate)
    });
  };

  const loadThis = (index: number) => {
    animateDatesRange(index);
    setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation);
    mainCircleRef.current?.children[index].classList.add("spinner__shoulder_active");

    const angleOfRotation = angleBetweenDots - index * angleBetweenDots;
    setTimeout(() => setAngle(angleOfRotation), 300);
    fadeIt(() => setCurrentEvent(index));
  };

  return (
    <main className='main'>
      <section className='historic-dates'>
        <h1 className='historic-dates__heading'>Исторические даты</h1>
        <DateRange startDate={startDate} endDate={endDate} startRef={startDateRef} endRef={endDateRef} />
        <Spinner
          historicDates={historicDates}
          currentEvent={currentEvent}
          loadThis={loadThis}
          angle={angle}
          timeOfRotation={timeOfRotation}
          mainCircleRef={mainCircleRef}
        />
        <NavigationPanel
          total={getTotal()}
          onPrev={() => loadThis(currentEvent - 1)}
          onNext={() => loadThis(currentEvent + 1)}
          isFirst={currentEvent === 0}
          isLast={currentEvent === numberOfEvents - 1}
        />
        <EventsSlider
          title={historicDates[currentEvent].title}
          events={historicDates[currentEvent].events}
          sliderRef={sliderRef}
        />
        <EventDots count={numberOfEvents} current={currentEvent} onClick={loadThis} />
      </section>
    </main>
  );
}
