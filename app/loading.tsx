'use client'
export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-10">
        {/* Code Icon */}
        <h1 className="text-6xl font-bold text-foreground tracking-tight select-none">
          {"< />"}
          <br />
          Loading........
        </h1>

        {/* Loading Line */}
        <div className="relative h-[2px] w-64 overflow-hidden bg-background/10 rounded-full">
          <span className="loader-dot" />
        </div>
      </div>

      <style jsx>{`
        .loader-dot {
          position: absolute;
          top: 50%;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          background: #71717a;
          transform: translateY(-50%);
          animation: move 1.6s ease-in-out infinite;
          box-shadow: 0 0 18px rgba(113, 113, 122, 0.8);
        }

        @keyframes move {
          0% {
            left: 0;
          }

          50% {
            left: calc(100% - 12px);
          }

          100% {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
}