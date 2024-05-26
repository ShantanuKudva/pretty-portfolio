"use client";

import { Button } from "@/components/ui/button";
import ChildTransition from "../transition";
import ShantanuCalCom from "@/components/calcom";

export default function Docs() {
  return (
    <div>
      <ChildTransition>
        <h2>
          Let&apos;s build something beautiful, together! Book a meeting below
        </h2>
        <ShantanuCalCom />
      </ChildTransition>
    </div>
  );
}
