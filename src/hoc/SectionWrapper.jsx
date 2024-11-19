import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = ( Component,idName ) =>
  function HOC () {
    return (
      <motion.section
        variants={ staggerContainer() }
        initial="hidden"
        whileInView="show"
        viewport={ { once: true,amount: 0.25 } }
        className={ `${styles.padding} max-w-7xl mx-auto relative z-0 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100` }
      >
        <span className="hash-span" id={ idName }>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };

export default StarWrapper;
