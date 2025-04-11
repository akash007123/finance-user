import { AlignJustify, BadgePlus } from "lucide-react";

export const Calender = () => {
  return (
    <>
      <div className="container py-16 px6">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
          {/* Show Current Day */}
          <div className="sidebar bg-green-500 text-white  rounded-lg w-2/3 relative">
            <div className="absolute top-3 left-3 text-white text-2xl">
              <AlignJustify />
            </div>

            <h1 className="text-9xl font-bold text-center">27</h1>
            <p className="text-4xl font-semibold uppercase text-center">thursday</p>

            <div className="px-6 mt-[100px] font-semibold">
              <p className="px-6 ">Current Event</p>
              <ul className="px-9 mt-5 list-disc">
                <li>Day 09 Daily CSS Image</li>
              </ul>

              <p className="mt-5">See Post Event</p>
            </div>

            <div className="createevent py-16 px-9 flex gap-4">
                <p className="font-semibold text-white">Create an Event </p>
                <button><BadgePlus /></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
