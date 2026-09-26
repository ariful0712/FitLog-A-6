import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#111111] text-white flex items-center justify-center px-5">

      <div className="text-center">

        <p className="text-[#ccff00] font-black tracking-widest text-sm">
          FITLOG
        </p>

        <h1 className="text-7xl md:text-9xl font-black mt-4">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-black mt-4">
          WORKOUT NOT FOUND
        </h2>

        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          The page you are looking for does not exist.
          Let&apos;s get you back to the workout library.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-[#ccff00] text-black px-7 py-3 rounded-full font-black hover:bg-[#b8e600] transition"
        >
          BACK TO WORKOUTS
        </Link>

      </div>

    </main>
  );
}