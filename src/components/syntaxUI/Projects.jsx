"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ProjectsData = [
  {
    id: 1,
    name: "GymSurf",
    description:
      "A website for the relentless, a website for the people who want to start getting fit",
    link: "https://gym-surf.vercel.app/",
    image: "/gymsurf.png",
  },
  {
    id: 2,
    name: "ML Heart and Lungs Health Predictor",
    description:
      "A robust ML app that helps you predict if a person has any heart and lungs disease or not",
    link: "https://full-stack-ml-frontend.vercel.app/",
    image: "/ml-frontend.png",
  },
  {
    id: 2,
    name: "Shantanu Kudva",
    description: "An 8-bit game themed portfolio!",
    link: "https://shantanu-portfolio-ebon.vercel.app/",
    image: "/s.jpg",
  },
];

const HoverSpring = () => {
  return (
    <div>
      <div className=" grid-cols-2 grid w-full sm:grid-cols-2 gap-x-10 md:grid-cols-3">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: "spring",
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border border-gray-200 dark:border-gray-800 p-4 rounded-lg shadow-sm hover:shadow-lg "
            >
              <a target="_blank" rel="noopener noreferrer" href={project.link}>
                <Image
                  src={project.image}
                  width={30}
                  height={30}
                  className="mb-3 rounded-lg"
                  alt={project.name}
                />
                <div className="mb-1 text-sm font-medium text-gray-900 dark:text-gray-200">
                  {project.name}
                </div>
                <div className="max-w-[250px] text-sm font-normal text-gray-500">
                  {project.description}
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HoverSpring;
