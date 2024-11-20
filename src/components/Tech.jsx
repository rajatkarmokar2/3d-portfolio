import React from "react";

import Marquee from "react-fast-marquee";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";

const Tech = () => {
  return (
    <Marquee gradient gradientColor='#050816' gradientWidth='50px' className='overflow-y-hidden py-3'>
      { technologies.map( ( technology ) => (
        <div
          className="mx-2 md:mx-5 p-2 hover:scale-110 hover:bg-secondary flex transition-transform bg-tertiary rounded"
          key={ technology.name }
        >
          <img className='size-14 md:size-24 m-auto' src={ technology.icon } alt='icon' />
          {/* <BallCanvas icon={ technology.icon } /> */ }
        </div>
      ) ) }
    </Marquee>
  );
};


export default SectionWrapper( Tech,"" );
