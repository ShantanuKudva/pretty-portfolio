import Projects from "@/components/syntaxUI/Projects";
import Timeline from "../components/syntaxUI/Timeline";
import ChildTransition from "./transition";
import AnimatedLogoCloud from "@/components/syntaxUI/logoCloud";
import { Separator } from "@/components/ui/separator";
import Testimonals from "@/components/syntaxUI/Testimonials";
import { FAQ } from "@/components/ui/faq";

export default function Home() {
  return (
    <ChildTransition>
      <div className=" mt-3">
        Hello! I&apos;m Dhaatri, an Electronics and Communication Engineer from
        Udupi. I have a great passion for teaching and an immense love for the
        Kannada language. With my dedication to teaching and my deep affection
        for Kannada, I am excited to share my knowledge and help students master
        this beautiful language through my venture{" "}
        <span className="underline font-bold">&quot;Kaliyiri&quot;</span>. Join
        me on this wonderful journey to explore and learn Kannada together!
      </div>
      <div>
        {/* <h2 className="mt-10 text-lg">Testimonals</h2> */}
        <div className="mt-4">
          <Testimonals />
        </div>
        <div className="flex justify-center items center mt-4">
          <h2 className="mb-1 max-w-2xl text-center text-2xl font-semibold tracking-tighter text-gray-900 md:text-4xl dark:text-gray-100">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-4">
          <FAQ />
        </div>

        {/* <h2 className="mt-10 text-lg">Experience</h2>
        <div className="mt-4">
          <Timeline />
        </div>
         */}
        {/* <Separator /> */}
        {/* <h2 className="mt-14 text-lg">Projects</h2> */}
        <div className="mt-4">{/* <Projects /> */}</div>
        {/* <AnimatedLogoCloud /> */}
      </div>
    </ChildTransition>
  );
}
