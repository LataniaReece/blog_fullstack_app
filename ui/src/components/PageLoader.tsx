import { FC } from "react";
import { motion, Variants } from "framer-motion";

const loadingText = "Loading...";

// Define the variants for the container and individual letters
const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1, // Stagger the animation of each child (letter)
    },
  },
};

const letterVariants: Variants = {
  initial: { opacity: 0.2 },
  animate: {
    opacity: [0.2, 1, 0.2], // Create a wave effect by changing opacity
    transition: {
      repeat: Infinity, // Repeat the animation indefinitely
      repeatType: "loop",
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

const PageLoader: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className="text-3xl font-bold"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {loadingText.split("").map((letter, index) => (
          <motion.span key={index} variants={letterVariants}>
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default PageLoader;
