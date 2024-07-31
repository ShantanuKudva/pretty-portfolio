import React from "react";

function Timeline() {
  return (
    <ol className="relative border-s border-gray-300 dark:border-gray-700 ">
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          ML Engineer - Niveus Systems
        </h3>
        <time className="mb-1 text-sm font-normal leading-none text-gray-500">
          July 2024 - Present
        </time>
        {/* <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
          Developing a comprehensive supply chain management tool from the
          ground up to replace their current practice of maintaining records in
          Excel.
        </p> */}
      </li>
      <li className="mb-10 ms-4">
        <div className="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Undergraduate Intern - Intel
        </h3>
        <time className="mb-1 text-sm font-normal leading-none text-gray-500">
          July 2023 - Mar 2024
        </time>
        {/* <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
          I was one of the founding members of a club dedicated to the ECE
          department at NMIT, which successfully organized numerous events.
        </p> */}
      </li>
    </ol>
  );
}

export default Timeline;
