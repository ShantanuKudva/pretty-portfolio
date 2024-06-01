"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const tabs = ["Home", "Blogs", "Contact"];

const Tab = ({ text, selected, setSelected }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (text === "Home") {
          router.push(`/`);
        } else {
          console.log(text);
          router.push(`/${text.toLowerCase()}`);
        }
        setSelected(text);
      }}
      className={`${
        selected
          ? "text-white dark: dark:text-black"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white font-[apple-font-medium]"
      } relative rounded-md px-2 py-1 text-sm font-[inter] transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-md bg-black dark:bg-white"
        ></motion.span>
      )}
    </button>
  );
};

const ButtonShapeTabs = () => {
  const [selected, setSelected] = useState(tabs[0]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/").filter((segment) => segment);
    const capitalizedSegments = segments.map(
      (segment) => segment[0].toUpperCase() + segment.slice(1)
    );
    console.log(capitalizedSegments);
    const joinedSegments = capitalizedSegments.join("");
    const index = tabs.findIndex((val) => val === capitalizedSegments[0]);
    if (index === -1) {
      setSelected(tabs[0]);
    } else {
      setSelected(tabs[index]);
    }
  }, []);

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2">
      {tabs.map((tab, index) => (
        <Tab
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

export default ButtonShapeTabs;
