"use client";

import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { cn } from "@/lib/cn";
import { ClipImage } from "@/components/ClipImage";
import { Variants, motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ALL_BACKGROUND_IMAGE,
  ALL_BACKGROUND_NAME,
} from "@/constants/background";

const textVariants: Variants = {
  hide: {
    y: "100%",
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
    },
  },
};

export default function Home() {
  const controls = useAnimation();
  const textControls = useAnimation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBg, setSelectedBg] = useState(0);
  const [currentText, setCurrentText] = useState(ALL_BACKGROUND_NAME[0]);

  const onHandleSpin = async () => {
    setIsLoading(true);

    const getNextValue = () => {
      if (selectedBg == ALL_BACKGROUND_IMAGE.length - 1) {
        return 0;
      } else {
        return selectedBg + 1;
      }
    };

    const nextValue = getNextValue();

    await setSelectedBg(nextValue);

    //* Palabra clave: "spinning"
    controls.start("spinning");

    await textControls.start("hide");
    setCurrentText(ALL_BACKGROUND_NAME[nextValue]);
    await textControls.start("visible");

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    // * Contenedor principal
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Contenedor central 1 - Z index 20*/}
      <ClipImage
        selectedBg={selectedBg}
        delayLevel={0}
        controls={controls}
        className={`z-20 ${styles.first_circle}`}
      ></ClipImage>

      {/* Contenedor central 2 - Z index 10*/}
      <ClipImage
        selectedBg={selectedBg}
        delayLevel={1}
        controls={controls}
        className={`z-10 ${styles.second_circle}`}
      >
        <div className="absolute top-0 left-0 w-full h-full z-[11] bg-slate-900 opacity-50"></div>
      </ClipImage>

      {/* Contenedor central 3  - Z index 0*/}
      <ClipImage
        selectedBg={selectedBg}
        delayLevel={2}
        controls={controls}
        className={`z-0 ${styles.third_circle}`}
      ></ClipImage>

      <div className="absolute z-40 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 inline-flex  overflow-hidden">
        <motion.p
          className="text-9xl tracking-[1rem] text-slate-200 font-bold"
          variants={textVariants}
          animate={textControls}
        >
          {currentText}
        </motion.p>
      </div>

      <div className="button_container z-30 absolute right-10 bottom-10">
        <Button
          onClick={onHandleSpin}
          isLoading={isLoading}
          round={"non-rounded"}
          variant={"outline"}
        >
          Siguiente Pantalla
        </Button>
      </div>
    </div>
  );
}
