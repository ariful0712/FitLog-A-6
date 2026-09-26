const Hero = () => {
  return (
    <section className="bg-[#111111] text-white">

      <div className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div>

          <p className="text-[#ccff00] font-bold tracking-[0.2em] text-sm mb-5">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-lg leading-8 max-w-xl mt-6">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="inline-flex items-center gap-2 mt-8 bg-[#ccff00] text-black px-6 py-3 rounded-full font-bold hover:bg-[#b8e600] transition"
          >
            BROWSE WORKOUTS
            <span>→</span>
          </a>

        </div>

        {/* Right Side - Banner Image */}
        <div className="flex justify-center">

          <div className="w-full h-[400px] rounded-2xl overflow-hidden">

            <img
              src="/banner.png"
              alt="FitLog workout"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;