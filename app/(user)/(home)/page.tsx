import { Button } from "@/components/ui/button";
import {Results,  ResultsSkeleton } from "./_components/results";
import { Suspense } from "react";

export default function Home() {
  return (
  <div className="h-full w-full p-8 max-w-screen-2xl mx-auto">
   <Suspense fallback = {<ResultsSkeleton />} >
    <Results />
    </Suspense>
  </div>
  );
}
