

import { HeroAnimations } from "@/src/app/(commonLayout)/_components";

  const secondaryOKLCH = "0.4 0.15 300"; 
  const primaryOKLCH = "0.9 0.2 180"; 
const backgroundOKLCH = "0.12 0.01 300";
  const foregroundOKLCH = "0.985 0 0";



export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden ">
      {/* Deep Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% 0%, oklch(${primaryOKLCH} / 0.15) 0%, transparent 50%),
                       radial-gradient(ellipse 60% 40% at 50% 100%, oklch(${secondaryOKLCH} / 0.2) 0%, transparent 50%)`
        }}
      />

      {/* Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse-glow bg-secondary/20" />
      <div 
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse-glow bg-primary/15"
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(oklch(${foregroundOKLCH}) 1px, transparent 1px),
                           linear-gradient(90deg, oklch(${foregroundOKLCH}) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <HeroAnimations />
      </div>

      {/* Curved Horizon Glow Effect - Like bolt.new */}
      <div className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
        {/* Main curved glow - secondary color */}
        <div 
          className="absolute bottom-[-350px] left-1/2 -translate-x-1/2 w-[150%] h-[500px] rounded-[100%] animate-glow-pulse"
          style={{
            background: `radial-gradient(ellipse at center top, oklch(${secondaryOKLCH} / 0.5) 0%, oklch(${secondaryOKLCH} / 0.2) 30%, transparent 70%)`,
            boxShadow: `0 0 120px 40px oklch(${secondaryOKLCH} / 0.3), 0 0 200px 80px oklch(${secondaryOKLCH} / 0.15)`,
          }}
        />
        {/* Primary accent layer */}
        <div 
          className="absolute bottom-[-380px] left-1/2 -translate-x-1/2 w-[120%] h-[450px] rounded-[100%]"
          style={{
            background: `radial-gradient(ellipse at center top, oklch(${primaryOKLCH} / 0.2) 0%, transparent 50%)`,
          }}
        />
        {/* Bright edge line */}
        <div 
          className="absolute bottom-[-340px] left-1/2 -translate-x-1/2 w-[140%] h-[400px] rounded-[100%]"
          style={{
            background: `transparent`,
            boxShadow: `inset 0 2px 0 oklch(${secondaryOKLCH} / 0.8), inset 0 4px 20px oklch(${secondaryOKLCH} / 0.4)`,
          }}
        />
      </div>

      {/* Bottom fade to clean edge */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: `linear-gradient(to top, oklch(${backgroundOKLCH}) 0%, transparent 100%)`
        }}
      />
    </section>
  );
}


// import { HeroAnimations } from "@/src/app/(commonLayout)/_components";

// export default function HeroSection() {
//   // 💡 Retrieve the raw oklch values from your globals.css to use them here.
//   // This is the only way to apply opacity when your variables are defined as full color strings.
//   // --primary: oklch(0.9 0.2 180);
//   // --secondary: oklch(0.4 0.15 300);
//   const secondaryOKLCH = "0.4 0.15 300"; // L C H values from --secondary
//   const primaryOKLCH = "0.9 0.2 180";     // L C H values from --primary

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Deep Background */}
//       <div className="absolute inset-0 bg-background" />

//       {/* Radial gradient overlay */}
//       <div 
//         className="absolute inset-0"
//         style={{
//           // CORRECTED: Manually applying oklch() around the variable value and alpha
//           background: `radial-gradient(ellipse 80% 50% at 50% 0%, oklch(${secondaryOKLCH} / 0.15) 0%, transparent 50%),
//                        radial-gradient(ellipse 60% 40% at 50% 100%, oklch(${primaryOKLCH} / 0.2) 0%, transparent 50%)`
//         }}
//       />

//       {/* Floating Glow Orbs - FIX FOR INLINE BG COLOR */}
//       <div 
//         className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-pulse-glow" 
//         style={{
      
//           backgroundColor: `oklch(${secondaryOKLCH} / 0.2)`
//         }}
//       />
//       <div 
//         className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] animate-pulse-glow"
//         style={{ 
//           animationDelay: "2s",
//           backgroundColor: `oklch(${primaryOKLCH} / 0.15)` // FIX: For bg-primary/15 if it was raw CSS
//         }}
//       />

//       {/* Subtle Grid Pattern - Using the original correct format for foreground variable */}
//       <div 
//         className="absolute inset-0 opacity-[0.02]"
//         style={{
//           // CORRECTED: Using the full color variable for grid lines.
//           backgroundImage: `linear-gradient(${foregroundOKLCH} 1px, transparent 1px),
//                            linear-gradient(90deg, ${foregroundOKLCH} 1px, transparent 1px)`,
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <HeroAnimations />
//       </div>

//       {/* Curved Horizon Glow Effect - FIX FOR INLINE STYLES */}
//       <div className="absolute bottom-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
//         {/* Main curved glow - secondary color */}
//         <div 
//           className="absolute bottom-[-350px] left-1/2 -translate-x-1/2 w-[150%] h-[500px] rounded-[100%] animate-glow-pulse"
//           style={{
//             // CORRECTED: Manually applying oklch() around the variable value and alpha
//             background: `radial-gradient(ellipse at center top, oklch(${secondaryOKLCH} / 0.5) 0%, oklch(${secondaryOKLCH} / 0.2) 30%, transparent 70%)`,
//             boxShadow: `0 0 120px 40px oklch(${secondaryOKLCH} / 0.3), 0 0 200px 80px oklch(${secondaryOKLCH} / 0.15)`,
//           }}
//         />
   
//         {/* Bright edge line - This style does not need fixing as it uses a solid oklch value with an alpha in the CSS */}
//         <div 
//           className="absolute bottom-[-340px] left-1/2 -translate-x-1/2 w-[140%] h-[400px] rounded-[100%]"
//           style={{
//             background: `transparent`,
//             boxShadow: `inset 0 2px 0 oklch(${secondaryOKLCH} / 0.8), inset 0 4px 20px oklch(${secondaryOKLCH} / 0.4)`,
//           }}
//         />
//       </div>

//       {/* Bottom fade to clean edge - This style is already correct as it uses standard CSS function */}
//       <div 
//         className="absolute bottom-0 left-0 right-0 h-24"
//         style={{
//           background: `linear-gradient(to top, oklch(${backgroundOKLCH}) 0%, transparent 100%)`
//         }}
//       />
//     </section>
//   );
// }