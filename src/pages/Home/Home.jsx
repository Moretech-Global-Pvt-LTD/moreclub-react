// import Coupon from "../../components/coupon/Coupon";
import About from "../../components/about/About";
import Coupon from "../../components/coupon/Coupon";
import Divider from "../../components/divider/Divider";
import HeroOne from "../../components/hero/HeroOne";
import Process from "../../components/process/Process";
import Project from "../../components/project/Project";
import LandingLayout from "../../components/Layout/LandingLayout";

import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.userReducer);

  return (
    <LandingLayout>
      {/* <Divider /> */}
      <HeroOne />
      <Divider />
      <Process />
      <Divider />
      {/*       {user.isAuthenticated && (
        <div className="container">
          <PricingPlans title="Pricing Plans" />
          <Divider />
        </div>
      )} */}
      <Coupon />
      <About />
      <Divider />
      <Project heading="Our Projects" />
      <Divider />
    </LandingLayout>
  );
};

export default Home;
