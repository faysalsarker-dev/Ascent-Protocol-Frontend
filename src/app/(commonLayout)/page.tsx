import FeaturesSection from "@/src/components/modules/landing/FeaturesSection";
import HeroSection from "@/src/components/modules/landing/HeroSection";
import RankSystemSection from "@/src/components/modules/landing/RankSystemSection";
import HowItWorksSection from "@/src/components/modules/landing/HowItWorksSection";
import GoldenChanceSection from "@/src/components/modules/landing/GoldenChanceSection";
import { GeneticProgressSection } from "./_components";
import Footer from "@/src/components/shared/Footer";


const page = () => {
    return (
        <div>
           <HeroSection/>
           <FeaturesSection/>
           <GeneticProgressSection/>
           <RankSystemSection/>
           <HowItWorksSection/>
           <GoldenChanceSection/>
            <Footer/>
        </div>
    );
};

export default page;