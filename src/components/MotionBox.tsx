import { Box, BoxProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

export const MotionBox = motion(Box);

export const BounceBoxDelay = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        bounce: 0.6,
        duration: 0.75,
        delay: props.noOfLines || 0.15,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const BounceBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        bounce: 0.6,
        duration: 0.75,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const BounceBoxRepeat = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        type: "spring",
        bounce: 0.6,
        duration: 0.75,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const FadeBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "fade",
        duration: 0.25,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const LeftBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        bounce: 0.35,
        duration: 0.75,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const RightBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        type: "spring",
        bounce: 0.35,
        duration: 0.75,
      }}
      animate={{
        rotate: props.noOfLines || 0,
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const UpBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 350 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        bounce: 0.3,
        duration: 0.75,
      }}
      m={"auto"}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const RotationBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ rotate: 0 }}
      whileInView={{ rotate: 360 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 60,
        repeatType: Infinity,
        ease: "linear",
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

export const BackgroundSpanBox = ({ children, ...props }: BoxProps) => {
  return (
    <MotionBox
      initial={{ x: "-55vw", y: 0 }}
      animate={{
        x: "55vw",
        y: [0, -50, 50, 0],
      }}
      transition={{
        duration: 75,
        repeatType: Infinity,
        ease: "easeInOut",
      }}
      position={"relative"}
      zIndex={0}
      {...props}
    >
      {children}
    </MotionBox>
  );
};
