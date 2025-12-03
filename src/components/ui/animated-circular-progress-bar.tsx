// import { cn } from "@/src/lib/utils"

// interface AnimatedCircularProgressBarProps {
//   max?: number
//   min?: number
//   value: number
//   gaugePrimaryColor: string
//   gaugeSecondaryColor: string
//   className?: string
// }

// export function AnimatedCircularProgressBar({
//   max = 100,
//   min = 0,
//   value = 0,
//   gaugePrimaryColor,
//   gaugeSecondaryColor,
//   className,
// }: AnimatedCircularProgressBarProps) {
//   const circumference = 2 * Math.PI * 45
//   const percentPx = circumference / 100
//   const currentPercent = Math.round(((value - min) / (max - min)) * 100)

//   return (
//     <div
//       className={cn("relative size-40 text-2xl font-semibold", className)}
//       style={
//         {
//           "--circle-size": "100px",
//           "--circumference": circumference,
//           "--percent-to-px": `${percentPx}px`,
//           "--gap-percent": "5",
//           "--offset-factor": "0",
//           "--transition-length": "1s",
//           "--transition-step": "200ms",
//           "--delay": "0s",
//           "--percent-to-deg": "3.6deg",
//           transform: "translateZ(0)",
//         } as React.CSSProperties
//       }
//     >
//       <svg
//         fill="none"
//         className="size-full"
//         strokeWidth="2"
//         viewBox="0 0 100 100"
//       >
//         {currentPercent <= 90 && currentPercent >= 0 && (
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             strokeWidth="10"
//             strokeDashoffset="0"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             className="opacity-100"
//             style={
//               {
//                 stroke: gaugeSecondaryColor,
//                 "--stroke-percent": 90 - currentPercent,
//                 "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
//                 strokeDasharray:
//                   "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
//                 transform:
//                   "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
//                 transition: "all var(--transition-length) ease var(--delay)",
//                 transformOrigin:
//                   "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
//               } as React.CSSProperties
//             }
//           />
//         )}
//         <circle
//           cx="50"
//           cy="50"
//           r="45"
//           strokeWidth="10"
//           strokeDashoffset="0"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="opacity-100"
//           style={
//             {
//               stroke: gaugePrimaryColor,
//               "--stroke-percent": currentPercent,
//               strokeDasharray:
//                 "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
//               transition:
//                 "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
//               transitionProperty: "stroke-dasharray,transform",
//               transform:
//                 "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
//               transformOrigin:
//                 "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
//             } as React.CSSProperties
//           }
//         />
//       </svg>
//       <span
//         data-current-value={currentPercent}
//         className="animate-in fade-in absolute inset-0 m-auto size-fit delay-[var(--delay)] duration-[var(--transition-length)] ease-linear"
//       >
//         {currentPercent}
//       </span>
//     </div>
//   )
// }


"use client";

import { cn } from "@/src/lib/utils";

interface NeonCircularProgressProps {
  value: number;     // example: 124
  max: number;       // example: 180
}

export function NeonCircularProgress({ value, max }: NeonCircularProgressProps) {
  const percent = Math.round((value / max) * 100);
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer radial glow */}
      <div className="absolute size-60 rounded-full bg-[radial-gradient(circle,rgba(0,255,200,0.25),transparent_70%)] blur-xl" />

      <svg className="size-40 rotate-[-90deg]">
        {/* Background track */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#153c32"
          strokeWidth="10"
          className="opacity-60"
          fill="none"
        />

        {/* Neon progress ring */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#58f0c3"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-700 ease-out drop-shadow-[0_0_12px_#58f0c3]"
        />
      </svg>

      {/* Value in center */}
      <div className="absolute flex flex-col items-center">
        <p className="text-4xl font-semibold text-white drop-shadow">
          {value}
        </p>
        <p className="text-xs text-gray-400">
          out of {max} scooters <br /> available
        </p>
      </div>
    </div>
  );
}
