import React from "react";

export default function Logo({ size = "md", showText = true }) {
  const sizes = {
    sm: { star: "w-6 h-6", text: "text-xs", container: "gap-2" },
    md: { star: "w-10 h-10", text: "text-sm", container: "gap-3" },
    lg: { star: "w-16 h-16", text: "text-lg", container: "gap-4" },
    xl: { star: "w-24 h-24", text: "text-2xl", container: "gap-5" }
  };

  const { star, text, container } = sizes[size];

  return (
    <div className={`flex flex-col items-center ${container}`}>
      {/* North Star with cross/lens flare effect */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow */}
        <div className="absolute inset-0 scale-150 bg-amber-400 blur-2xl opacity-50" />
        
        {/* Star burst effect */}
        <div className={`relative ${star} flex items-center justify-center`}>
          {/* Vertical beam */}
          <div className="absolute w-px bg-gradient-to-b from-transparent via-amber-300 to-transparent h-full" />
          {/* Horizontal beam */}
          <div className="absolute h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent w-full" />
          
          {/* Center bright point */}
          <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1),0_0_40px_rgba(251,191,36,1)]" />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <div className={`${text} font-black tracking-wider text-center leading-none text-white`}>
          <div className="mb-1">NORTH</div>
          <div className="text-[0.8em] font-black tracking-widest mb-1 text-center">OF</div>
          <div className="mb-2">NORMAL</div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      )}
    </div>
  );
}