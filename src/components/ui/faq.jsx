import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./button";

export function FAQ() {
  return (
    <Accordion type="single" collapsible cl assName="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Why &quot;Kaliyiri&quot;?</AccordionTrigger>
        <AccordionContent>
          Kaliyiri offers interactive basic Kannada communication courses
          designed to make learning easy and enjoyable. It provides some basic
          grip on the language and helps you to communicate in Kannada. This is
          especially useful for people who are new to Karnataka and want to
          learn the language.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What about time flexibility?</AccordionTrigger>
        <AccordionContent>
          Classes are held on weekdays between 7-10 PM. Special classes can be
          arranged on weekends as needed.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Are the classes taught by a native speaker?
        </AccordionTrigger>
        <AccordionContent>
          Yes, the classes are taught by a native Kannada speaker{" "}
          <span>&#40;</span>which is me!<span>&#41;</span>. Materials will be
          provided with English transcripts to aid learning.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What is the teaching method?</AccordionTrigger>
        <AccordionContent>
          The teaching method involves online calls to ensure personalized and
          interactive learning experiences.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Are there any Trial classes?</AccordionTrigger>
        <AccordionContent>
          No, There will not be any trial classes.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>How much do the courses cost?</AccordionTrigger>
        <AccordionContent>
          Pricing will be discussed during a call to tailor the courses to your
          specific needs. You can book a call in the{" "}
          <span className="underline">
            <a href="/contact">contact</a>
          </span>{" "}
          section.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
