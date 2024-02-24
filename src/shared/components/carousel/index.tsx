import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <Image alt='intro' src='/1.svg' width={475} height={703} />
      <Image alt='intro' src='/2.svg' width={475} height={703} />
      <Image alt='intro' src='/3.svg' width={475} height={703} />
      <Image alt='intro' src='/4.svg' width={475} height={703} />
    </Slider>
  );
}
