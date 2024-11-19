import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { heroBg } from "../assets";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto pt-[120px]`}>
      <img loading="lazy" className='absolute inset-0 bg-cover bg-no-repeat bg-center' src={heroBg} alt="" />
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-gray-900 dark:text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Rajat</span>
          </h1>
          <p
            className={`${styles.heroSubText} mt-2 text-gray-700 dark:text-gray-300`}
          >
            I develop Website's, user interfaces,
            <br className="sm:block hidden" />
            web and mobile applications
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-gray-500 dark:border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-gray-500 dark:bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
