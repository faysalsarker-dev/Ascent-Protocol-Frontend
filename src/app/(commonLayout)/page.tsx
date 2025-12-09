import FeaturesSection from "@/src/components/modules/landing/FeaturesSection";
import HeroSection from "@/src/components/modules/landing/HeroSection";
import RankSystemSection from "@/src/components/modules/landing/RankSystemSection";
import HowItWorksSection from "@/src/components/modules/landing/HowItWorksSection";
import GoldenChanceSection from "@/src/components/modules/landing/GoldenChanceSection";
import { GeneticProgressSection } from "./_components";



const page = () => {
    return (
        <>
       
           <HeroSection/>
           <FeaturesSection/>
           <GeneticProgressSection/>
           <RankSystemSection/>
           <HowItWorksSection/>
           <GoldenChanceSection/>
            
        </>
    );
};

export default page;