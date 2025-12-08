import FeaturesSection from "@/src/components/modules/landing/FeaturesSection";
import HeroSection from "@/src/components/modules/landing/HeroSection";
import RankSystemSection from "@/src/components/modules/landing/RankSystemSection";


const page = () => {
    return (
        <div>
           <HeroSection/>
           <FeaturesSection/>
           <RankSystemSection/>
        </div>
    );
};

export default page;