// import Coupon from "../../components/coupon/Coupon";
import About from "../../components/about/About";
import Coupon from "../../components/coupon/Coupon";
import Divider from "../../components/divider/Divider";
import HeroOne from "../../components/hero/HeroOne";
import Process from "../../components/process/Process";
import Project from "../../components/project/Project";
import LandingLayout from "../../components/Layout/LandingLayout";
import PricingPlans from "../Pricing/PricingPlans";



const Home = () => {
    return(
        <LandingLayout>
            {/* <Divider /> */}
            <HeroOne />
            <Divider />
            <Process />
            <Divider />
            <div className="container">
            <PricingPlans title="Pricing Plans"/>
            </div>
            <Divider />
            <Coupon />
            <About />
            <Divider />
            <Project heading="Our Projects" />
            <Divider />
           

            
            
        </LandingLayout>
    )
}

export default Home;