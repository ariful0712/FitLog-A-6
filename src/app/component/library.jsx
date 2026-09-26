"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./workoutCard";

const Library = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sort option
  const [sortBy, setSortBy] = useState("duration");
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.log("Failed to load workouts:", error);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  // Sort workouts
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }
    if (sortBy === "calories") {
      return Number(a.caloriesBurned) - Number(b.caloriesBurned);
    }
    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }
    return 0;
  });

  // Loading state
  if (loading) {
    return (
      <section
        id="library"
        className="bg-[#111111] text-white py-20"
      >
        <div className="max-w-7xl mx-auto px-5 flex flex-col items-center justify-center min-h-[300px]">

          {/* Loading Spinner */}
          <div className="w-12 h-12 border-4 border-gray-700 border-t-[#ccff00] rounded-full animate-spin"></div>

          <p className="text-[#ccff00] text-xl font-bold mt-5">
            Loading workouts...
          </p>

        </div>
      </section>
    );
  }
  if (error) {
  return (
    <section
      id="library"
      className="bg-[#111111] text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-5 text-center">
        <p className="text-red-400 text-xl font-bold">
          {error}
        </p>

        <p className="text-gray-500 mt-3">
          Please refresh the page and try again.
        </p>
      </div>
    </section>
  );
}

  return (
    <section
      id="library"
      className="bg-[#111111] text-white py-20"
    >
      <div className="max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="mb-10">

          <p className="text-[#ccff00] font-bold tracking-widest text-sm">
            WORKOUT COLLECTION
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-2">
            THE LIBRARY
          </h2>
          <p className="text-gray-400 mt-3">
            Twelve lifts covering every major muscle group.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <label
              htmlFor="sort"
              className="text-gray-400 font-bold"
            >
              SORT BY
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#181818] border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>
              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Library;