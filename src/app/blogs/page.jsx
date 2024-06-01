import React from "react";
import ChildTransition from "../transition";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LeftToRightTransiton from "../LeftTransition";

function page() {
  return (
    <ChildTransition>
      <div className="flex flex-col gap-3 w-full">
        <LeftToRightTransiton>
          <a href="https://medium.com/@kudvashantanu2002/finding-strength-in-rejection-navigating-job-search-challenges-8142ed26232e">
            <Card className="shadow-sm hover:shadow-lg ease-in">
              <div className="m-5">
                <div className="font-[apple-font-regular]">
                  How Rejections Define you. | Finding Strength in Rejection
                </div>
                <div className="font-[apple-font-thin] text-gray-700 dark:text-gray-400 mt-3">
                  My two-cents on how rejections shape you in the toughest of
                  times.
                </div>
              </div>
            </Card>
          </a>
        </LeftToRightTransiton>
      </div>
    </ChildTransition>
  );
}

export default page;
