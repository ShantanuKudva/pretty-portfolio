import Projects from "@/components/syntaxUI/Projects";
import Timeline from "../components/syntaxUI/Timeline";
import ChildTransition from "./transition";

export default function Home() {
  return (
    <ChildTransition>
      <div className="text-gray-700 text-sm  dark:text-gray-400">
        Hello! I&apos;m Shantanu Kudva, an Electronics and Communication
        Engineer from Bangalore. With a deep passion for full stack web
        development, I enjoy crafting innovative web solutions that merge
        technology with creativity
      </div>
      <div>
        <h2 className="mt-10 text-lg font-[inter]">Experience</h2>
        <div className="mt-4">
          <Timeline />
        </div>
        <h2 className="mt-14 text-lg font-[inter]">Projects</h2>
        <div className="mt-4">
          <Projects />
        </div>
      </div>
    </ChildTransition>
  );
}
