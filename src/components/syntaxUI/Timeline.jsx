import React from "react";

function Timeline() {
  return (
    <ol class="relative border-s border-gray-300 dark:border-gray-700 ">
      <li class="mb-10 ms-4">
        <div class="absolute w-3 h-3 bg-gray-700 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
          February 2024 - Present
        </time>
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Software Developer Intern - Nivetti Systems
        </h3>
        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
          Developing a comprehensive supply chain management tool from the
          ground up to replace their current practice of maintaining records in
          Excel.
        </p>
      </li>
    </ol>
  );
}

export default Timeline;