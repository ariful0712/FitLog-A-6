import Link from "next/link";

const WorkoutCard = ({ workout }) => {
  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-[#171717] border border-gray-800 rounded-xl overflow-hidden hover:border-[#ccff00] transition duration-300">

        {/* Image */}
        <div className="h-60 overflow-hidden">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5">

          {/* Category */}
          <div className="flex gap-2 flex-wrap mb-4">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="text-xs font-bold bg-[#ccff00] text-black px-3 py-1 rounded-full"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Name */}
          <h2 className="text-xl font-black text-white uppercase">
            {workout.name}
          </h2>

          {/* Equipment */}
          <p className="text-gray-400 text-sm mt-2">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between mt-5 text-sm text-gray-300">
            <span>⏱ {workout.duration} min</span>

            <span>🔥 {workout.caloriesBurned} kcal</span>

            <span>⭐ {workout.rating}</span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;