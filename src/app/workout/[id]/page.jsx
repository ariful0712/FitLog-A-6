"use client";
import toast from "react-hot-toast";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "../../component/planContext";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);

  const { addToPlan, saveWorkout } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        const data = await response.json();

        setWorkout(data);
      } catch (error) {
        console.log("Error loading workout:", error);
      } finally {
        setLoading(false);
      }
    };

    getWorkout();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <p className="text-[#ccff00] text-xl font-bold">
          Loading workout...
        </p>
      </main>
    );
  }

  // Workout not found
  if (!workout) {
    return (
      <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black">
            Workout not found
          </h1>

          <Link
            href="/"
            className="inline-block mt-6 bg-[#ccff00] text-black px-6 py-3 rounded-full font-bold"
          >
            Back to workouts
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#111111] text-white min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-5">

        {/* Back Button */}
        <Link
          href="/"
          className="inline-block mb-8 text-gray-400 hover:text-[#ccff00]"
        >
          ← Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT - IMAGE */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
          </div>

          {/* RIGHT - INFORMATION */}
          <div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-black uppercase">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg leading-8 mt-5">
              {workout.description}
            </p>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-6">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="bg-[#ccff00] text-black px-4 py-2 rounded-full text-sm font-bold"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-8 border border-gray-800 rounded-xl overflow-hidden">

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  EQUIPMENT
                </span>

                <span className="font-bold">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  DIFFICULTY
                </span>

                <span className="font-bold">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  SETS
                </span>

                <span className="font-bold">
                  {workout.sets}
                </span>
              </div>

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  REPS
                </span>

                <span className="font-bold">
                  {workout.reps}
                </span>
              </div>

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  DURATION
                </span>

                <span className="font-bold">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex justify-between p-4 border-b border-gray-800">
                <span className="text-gray-500">
                  CALORIES
                </span>

                <span className="font-bold">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between p-4">
                <span className="text-gray-500">
                  RATING
                </span>

                <span className="font-bold">
                  ⭐ {workout.rating}
                </span>
              </div>

            </div>

            {/* Instructions */}
            <div className="mt-8">

              <h2 className="text-2xl font-black mb-5">
                INSTRUCTIONS
              </h2>

              <ol className="space-y-4">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="flex gap-4 text-gray-300"
                  >
                    <span className="text-[#ccff00] font-black">
                      {index + 1}.
                    </span>

                    <span>
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>

            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              {/* Add to Today's Plan */}
              <button
                onClick={() => {
                  const added = addToPlan(workout);

                  if (added) {
                   toast.success("Added to today's plan");
                   } else {
                   toast.error("This workout is already in your plan or the plan is full.");
                 }
                }}
                className="bg-[#ccff00] text-black px-6 py-4 rounded-full font-black hover:bg-[#b8e600] transition"
              >
                + ADD TO TODAY&apos;S PLAN
              </button>

              {/* Save for Later */}
              <button
                onClick={() => {
                  const added = saveWorkout(workout);

                  if (added) {
                    toast.success("Saved for later");
                  } else {
                    toast.error("This workout is already saved.");
                  }
                }}
                className="border border-[#ccff00] text-[#ccff00] px-6 py-4 rounded-full font-black hover:bg-[#ccff00] hover:text-black transition"
              >
                ♡ SAVE FOR LATER
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}