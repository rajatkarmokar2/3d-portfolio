import React from "react";

import Marquee from "react-fast-marquee";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";

const Tech = () => {
  return (
    <Marquee gradient gradientColor='#050816' className='overflow-y-hidden py-3'>
      { technologies.map( ( technology ) => (
        <div
          className="mx-5 hover:scale-110 transition-transform bg-tertiary rounded"
          key={ technology.name }
        >
          <img className='size-28 ' src={ technology.icon } alt='icon' />
          {/* <BallCanvas icon={ technology.icon } /> */ }
        </div>
      ) ) }
    </Marquee>
  );
};


export default SectionWrapper( Tech,"" );
