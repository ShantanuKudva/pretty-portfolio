"use client";

import { Button } from "@/components/ui/button";
import ChildTransition from "../transition";
import ShantanuCalCom from "@/components/calcom";

export default function Docs() {
  return (
    <div>
      <ChildTransition>
        <h2 className="font-[apple-font-regular] text-lg text-gray-700 dark:text-gray-400 mt-3">
          Let&apos;s build something beautiful, together! Book a meeting below
        </h2>
        <div className="my-4">
          <ShantanuCalCom />
        </div>
      </ChildTransition>
    </div>
  );
}
