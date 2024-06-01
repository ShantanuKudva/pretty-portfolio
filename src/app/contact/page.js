"use client";

import { Button } from "@/components/ui/button";
import ChildTransition from "../transition";
import ShantanuCalCom from "@/components/calcom";

export default function Docs() {
  return (
    <div>
      <ChildTransition>
        <h2 className="font-[apple-font-regular]">
          Let&apos;s build something beautiful, together! Book a meeting below
        </h2>
        <div className="my-4">
          <ShantanuCalCom />
        </div>
      </ChildTransition>
    </div>
  );
}
