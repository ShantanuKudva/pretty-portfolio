"use client";
import React from "react";
import { Typewriter } from "nextjs-simple-typewriter";
import Image from "next/image";

const Kaliyiri = () => {
  const handleDone = () => {
    console.log(`Done after 5 loops!`);
  };

  return (
    <span className="font-bold text-yellow-400">
      <Typewriter
        words={["Kaliyiri", "ಕಲಿಯಿರಿ"]}
        // cursorBlinking={true}
        // cursor
        // cursorStyle=""
        loop={0}
        cursorColor="red"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </span>
  );
};

export default Kaliyiri;
