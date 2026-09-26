"use client";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import { usePlan } from "../component/planContext";

export default function MyPlan() {
const {
  plan,
  saved,
  markAsDone,
  removeFromPlan,
  removeFromSaved,
} = usePlan();

  const [activeTab, setActiveTab] = useState("plan");

  const currentList = activeTab === "plan" ? plan : saved;

  // Calculate total minutes
  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  // Calculate total calories
  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  return (
    <main className="min-h-screen bg-[#111111] text-white py-16">

      <div className="max-w-6xl mx-auto px-5">

        {/* Header */}
        <div className="mb-10">

          <p className="text-[#ccff00] font-bold tracking-widest text-sm">
            FITLOG
          </p>

          <h1 className="text-5xl md:text-6xl font-black mt-2">
            MY PLAN
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Cap of five lifts for today. Finish them, then load more.
          </p>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

          {/* Exercises */}
          <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 font-bold text-sm">
              EXERCISES
            </p>

            <p className="text-4xl font-black mt-2">
              {plan.length}
            </p>
          </div>

          {/* Minutes */}
          <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 font-bold text-sm">
              MINUTES
            </p>

            <p className="text-4xl font-black mt-2">
              {totalMinutes}
            </p>
          </div>

          {/* Calories */}
          <div className="bg-[#181818] border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-500 font-bold text-sm">
              CALORIES
            </p>

            <p className="text-4xl font-black mt-2">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">

          <button
            onClick={() => setActiveTab("plan")}
            className={`px-6 py-3 rounded-full font-black ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-gray-700 text-gray-400"
            }`}
          >
            TODAY&apos;S PLAN
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-6 py-3 rounded-full font-black ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-gray-700 text-gray-400"
            }`}
          >
            SAVED
          </button>

        </div>

        {/* Empty State */}
        {currentList.length === 0 ? (
          <div className="border border-dashed border-gray-700 rounded-2xl p-12 text-center">

            <h2 className="text-3xl font-black">
              NOTHING HERE YET
            </h2>

            <p className="text-gray-400 mt-3">
               {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                  : "Save your favorite workouts here for later."}
                    </p>

            <Link
              href="/"
              className="inline-block mt-6 bg-[#ccff00] text-black px-6 py-3 rounded-full font-black"
            >
              GO TO WORKOUTS
            </Link>

          </div>
        ) : (

          /* Workout List */
          <div className="space-y-5">

            {currentList.map((workout) => (

              <div
                key={workout.id}
                className="bg-[#181818] border border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row gap-5"
              >


                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full md:w-48 h-40 object-cover rounded-xl"
                />



                <div className="flex-1">

                  <h2 className="text-2xl font-black uppercase">
                    {workout.name}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {workout.equipment}
                  </p>


                  <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-300">
                    <span>

                      ⏱ {workout.duration} min
                    </span>

                    <span>
                      🔥 {workout.caloriesBurned} kcal
                    </span>
                    
                    <span>
                      ⭐ {workout.rating}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 mt-5">

                    <Link
                      href={`/workout/${workout.id}`}
                      className="border border-gray-600 px-4 py-2 rounded-full font-bold hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                      VIEW DETAILS
                    </Link>
                      <button
                        onClick={() => {
                          markAsDone(workout.id);
                          toast.success(`${workout.name} marked as done!`);
                           }}
                           disabled={workout.done}
                                  className={`px-4 py-2 rounded-full font-bold ${
                             workout.done
                             ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                              : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
                                 }`}
                                >
                                 {workout.done ? "✓ DONE" : "✓ MARK AS DONE"}
                                 </button>

                    {activeTab === "plan" ? (
                      <button
                        onClick={() => {
                          removeFromPlan(workout.id);
                          toast.success("Workout removed from plan");
                        }}
                        className="border border-red-500 text-red-400 px-4 py-2 rounded-full font-bold"
                      >
                        ✕ REMOVE
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          removeFromSaved(workout.id);
                          toast.success("Workout removed from saved");
                        }}
                        className="border border-red-500 text-red-400 px-4 py-2 rounded-full font-bold"
                      >
                        ✕ REMOVE
                      </button>
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}