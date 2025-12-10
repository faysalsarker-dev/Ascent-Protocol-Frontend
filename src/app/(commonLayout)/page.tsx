import { Metadata } from "next";
import dynamic from "next/dynamic";



// Landing Sections
import HeroSection from "@/src/components/modules/landing/HeroSection";
import FeaturesSection from "@/src/components/modules/landing/FeaturesSection";
import RankSystemSection from "@/src/components/modules/landing/RankSystemSection";
import HowItWorksSection from "@/src/components/modules/landing/HowItWorksSection";
import GoldenChanceSection from "@/src/components/modules/landing/GoldenChanceSection";

// Lazy-loaded Server Component
const GeneticProgressSection = dynamic(
  () => import("./_components/dna/GeneticProgressSection")
);

export const metadata: Metadata = {
  title: "Ascent Protocol – Level Up Your Fitness Journey",
  description:
    "Ascent Protocol is your next-gen fitness ecosystem — track progress, unlock ranks, and evolve your performance through science-driven progression.",
  keywords: [
    "Ascent Protocol",
    "fitness app",
    "workout progression",
    "rank system",
    "genetic progress",
    "next-gen fitness",
  ],
  openGraph: {
    title: "Ascent Protocol – Transform Your Fitness Journey",
    description:
      "Unlock elite performance through structured ranks, progress tracking, and personalized fitness evolution.",
    url: "https://your-domain.com",
    siteName: "Ascent Protocol",
    type: "website",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ascent Protocol Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ascent Protocol – Transform Your Journey",
    description:
      "Level up your fitness game with evolution-driven progress, ranks, and performance tracking.",
    images: ["https://your-domain.com/og-image.png"],
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
};

const Page = () => {
  return (
    <>
 

      {/* Hero / First Impression */}
      <HeroSection />

      {/* Core Features */}
      <FeaturesSection />

      {/* Genetic Progress (Lazy Loaded) */}
      <GeneticProgressSection />

      {/* Ranking System */}
      <RankSystemSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Golden Chance / CTA */}
      <GoldenChanceSection />

   
    </>
  );
};

export default Page;
