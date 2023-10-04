import { ALL_BACKGROUND_IMAGE } from "@/constants/background";
import { cn } from "@/lib/cn";
import {
  AnimationControls,
  Variants,
  motion,
  useMotionTemplate,
} from "framer-motion";
import Image from "next/image";
import { FC, HTMLAttributes, useState } from "react";

const MotionImage = motion(Image);

interface ClipImageProps extends HTMLAttributes<HTMLDivElement> {
  controls: AnimationControls;
  delayLevel: number;
  selectedBg: number;
}

const FULL_ROTATE_DEGREE = 360;

export const ClipImage: FC<ClipImageProps> = ({
  className,
  children,
  delayLevel,
  selectedBg,
  controls,
}) => {
  const [spinNumber, setSpinNumber] = useState(0);

  const variantsRotate: Variants = {
    spinning: {
      rotate: FULL_ROTATE_DEGREE * (spinNumber + 1),
      transition: {
        duration: 1.5,
        delay: delayLevel * 0.15,
        ease: "easeInOut",
      },
    },
  };

  const variantsContainer: Variants = {
    spinning: (isVisible: boolean) => ({
      opacity: isVisible ? 1 : 0,
      transition: {
        duration: 0.5,
        delay: (delayLevel + 2) * 0.25,
        type: "tween",
      },
    }),
  };

  return (
    <div
      className={cn(
        "absolute top-0 left-0 w-full h-full overflow-hidden",
        className
      )}
    >
      {children}

      {ALL_BACKGROUND_IMAGE.map((backgroundItem, index) => (
        <motion.div
          key={index}
          custom={selectedBg == index}
          initial={{
            opacity: selectedBg == index ? 1 : 0,
          }}
          animate={controls}
          variants={variantsContainer}
        >
          <MotionImage
            animate={controls}
            onAnimationComplete={() => setSpinNumber(spinNumber + 1)}
            variants={variantsRotate}
            className="object-cover"
            alt=""
            src={backgroundItem}
            fill
            style={{ scale: 2.3 }}
          />
        </motion.div>
      ))}
    </div>
  );
};
