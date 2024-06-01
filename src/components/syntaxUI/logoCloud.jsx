// Instructions for integrating continuous logo animation in Tailwind CSS:
// Add the following configurations to the `extend` section of your `tailwind.config.js`:
// 1. Keyframes for 'logo-cloud' animation that continuously moves logos from right to left:
//    keyframes: {
//      'logo-cloud': {
//        from: { transform: 'translateX(0)' },
//        to: { transform: 'translateX(calc(-100% - 4rem))' },
//      },
//    }
// 2. Animation utility to apply this keyframe:
//    animation: {
//      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
//    }

"use client";

const logos = [
  {
    name: "Nextjs",
    url: "https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg",
  },
  {
    name: "ReactJS",
    url: "/icons/react.svg",
  },
  {
    name: "CSS",
    url: "/icons/css.svg",
  },
  {
    name: "Docker",
    url: "/icons/docker.svg",
  },

  {
    name: "Git",
    url: "/icons/git.svg",
  },
  {
    name: "GitHub",
    url: "/icons/github.svg",
  },
  {
    name: "JavaScript",
    url: "/icons/javascript.svg",
  },
  {
    name: "MongoDB",
    url: "/icons/mongodb.svg",
  },
  {
    name: "MySQL",
    url: "/icons/mysql.svg",
  },
  {
    name: "NodeJS",
    url: "/icons/nodejs.svg",
  },
  {
    name: "Python",
    url: "/icons/python.svg",
  },
  {
    name: "VsCode",
    url: "/icons/vscode.svg",
  },
];

import Image from "next/image";

const AnimatedLogoCloud = () => {
  return (
    <div className="w-full py-12">
      <div className="mx-auto w-full px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              "linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)",
          }}
        >
          {Array(5)
            .fill(null)
            .map((index) => (
              <div
                key={index}
                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
              >
                {logos.map((logo, key) => (
                  <Image
                    key={key}
                    src={logo.url}
                    className="h-10 w-28 px-2 brightness-0  dark:invert"
                    alt={`${logo.name}`}
                    width={20}
                    height={20}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedLogoCloud;
