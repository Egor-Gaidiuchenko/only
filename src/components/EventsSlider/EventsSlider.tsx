import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type Event = {
  date: string;
  description: string;
};

type Props = {
  title: string;
  events: Event[];
  sliderRef: React.RefObject<HTMLDivElement>;
};

export default function EventsSlider({ title, events, sliderRef }: Props) {
  return (
    <div ref={sliderRef} className="historic-dates__slider slider">
      <p className="slider__mobile-title">{title}</p>
      <button className="slider__btn slider__btn_prev" />
      <Swiper
        modules={[Navigation]}
        spaceBetween={80}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1.5, spaceBetween: 25 },
          769: { slidesPerView: 3, spaceBetween: 80 },
          1025: { slidesPerView: 4, spaceBetween: 80 },
        }}
        navigation={{
          prevEl: '.slider__btn_prev',
          nextEl: '.slider__btn_next',
        }}
      >
        {events.map((item, index) => (
          <SwiperSlide key={index} className="slider__slide">
            <p className="slider__year">{item.date}</p>
            <p className="slider__description">{item.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="slider__btn slider__btn_next" />
    </div>
  );
}
