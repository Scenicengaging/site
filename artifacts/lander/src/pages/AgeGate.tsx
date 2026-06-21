import { useLocation } from "wouter";

export default function AgeGate() {
  const [, navigate] = useLocation();

  function proceed() {
    navigate("/offer");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Quick Verification
          </h1>
          <p className="text-gray-500 text-center text-base">
            Are you 21 years of age or older?
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <button
            onClick={proceed}
            className="w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-bold text-lg py-5 rounded-2xl shadow-md transition-colors"
          >
            Yes, I am 21 or older
          </button>
          <button
            onClick={proceed}
            className="w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-lg py-5 rounded-2xl border border-gray-200 transition-colors"
          >
            No, I am under 21
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center">
          This helps us ensure eligibility for reward programs.
        </p>
      </div>
    </div>
  );
}
