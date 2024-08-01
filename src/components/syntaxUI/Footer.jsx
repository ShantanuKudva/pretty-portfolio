import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { CgMail } from "react-icons/cg";

const MinimalSocialsFooter = () => {
  return (
    <div className="flex w-[90vw] m-auto mb-10 flex-col items-center justify-between gap-5 border-t border-gray-900/5 pt-8 sm:flex-row dark:border-white/5">
      <p className="text-sm dark:text-gray-100 text-gray-700 font-[apple-font-regular]">
        Copyright © {new Date().getFullYear()}{" "}
        <a
          href="https://shantanukudva.vercel.app"
          className=" text-red-500 underline hover:text-red-500 "
        >
          Shantanu Kudva
        </a>{" "}
      </p>
      <div className="flex gap-4">
        <div>
          <a
            className="text-gray-600 text-xl"
            href="https://instagram.com/dhaatri_rao"
            target="_blank"
          >
            <FaInstagram />
          </a>
        </div>
        <div>
          <a
            className="text-gray-600 text-xl"
            href="https://www.linkedin.com/in/dhaatri-rao-27a2591b4"
            target="_blank"
          >
            <FaLinkedin />
          </a>
        </div>
        <div>
          <a
            href="mailto:dhaatriiprasanna@gmail.com"
            className="text-gray-600 text-xl"
          >
            <CgMail />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MinimalSocialsFooter;
