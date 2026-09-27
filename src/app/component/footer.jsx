import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b0b] text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-3xl font-black">
              FIT<span className="text-[#ccff00]">LOG</span>
            </h2>

            <p className="text-gray-400 mt-4 leading-7 max-w-sm">
              A simple workout companion to discover exercises,
              build your daily plan, and keep track of your progress.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4">
              QUICK LINKS
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-gray-400 hover:text-[#ccff00] transition"
              >
                Workout Library
              </Link>
              <Link
                href="/my-plan"
                className="text-gray-400 hover:text-[#ccff00] transition"
              >
                My Plan
              </Link>
            </div>
          </div>



          <div>
            <h3 className="text-lg font-black mb-4">
              FITLOG
            </h3>
            <p className="text-gray-400 leading-7">
              Train with intent.
              <br />
              Log every set.
              <br />
              Keep moving forward.
            </p>
          </div>
        </div>


        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-500">
          <p>
            © 2026 FitLog. All rights reserved.
          </p>

          <p>
            Built with Next.js & Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;