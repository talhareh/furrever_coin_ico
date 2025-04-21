"use client";

import RoadmapSection from './RoadmapSection';

export default function RoadmapContainer() {
  return (
    <div className="bg-[#6bccd5] w-full 3xl:h-[70vh] 2xl:h-[78vh] lg:h-[100vh] flex relative flex-col items-center text-center">
      <h2 id='roadmap' className="text-5xl md:text-7xl font-semibold text-white">Roadmap</h2>
      <RoadmapSection />
    </div>
  );
}
