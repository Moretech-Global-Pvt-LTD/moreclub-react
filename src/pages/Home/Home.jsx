import Divider from "../../components/divider/Divider";
import Process from "../../components/home/Process";
import Hero from "../../components/home/hero";
import Navbar from "../../components/header/Navbar";
import Stat from "../../components/home/stat";
import InfoContainer from "../../components/home/InfoContainer";
import Featuredtext from "../../components/home/Featuredtext";
import FreeButton from "../../components/home/FreeButton";
import PartnerSection from "../../components/home/PartnerSection";
import Footer from "../../components/footer/Footer";
import Boost from "../../images/svg/BOOST.svg";
import Growth from "../../images/svg/gROWTH.svg";
import Growth2 from "../../images/svg/gROWTHS.svg";
import Rewards from "../../images/svg/REWARD.svg";
import Savings from "../../images/svg/SAVINGS.svg";
import Unlock from "../../images/svg/secure.svg";

import playstore from "../../images/about/1.png";
import appstore from "../../images/about/2.png";
import { Button, Container, Placeholder, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PopularResturant from "../../components/Moreclub/morefood/PopularResturant";
import PopularSaloon from "../../components/Moreclub/Saloon/PopularSaloon";
import HeroCarousel from "../../components/home/HeroCarousel";
import Newhero from "../../components/home/Newhero";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../../config/config";
import PartnerSkeleton from "../../components/Skeleton/PartnerSkeleton";
import Popularhotels from "../../components/Moreclub/moreliving/popularHotels";

const Infodata1 = [
  {
    image: Boost,
    heading: "Boost Your Savings and Earnings with More Deals Club!",
    subheadings: [
      {
        title: "All-In-One Platform for Ultimate Benefits",
        description:
          "More Deals Club gives you everything you need to save money and earn rewards effortlessly. Manage your referrals, track your rewards, and enjoy exclusive discounts all in one place.",
      },

      {
        title: "Sign Up Today and Start Earning!",
        description:
          "Join More Deals Club now and unlock the ultimate platform for savings and rewards. Don't miss out on the easiest way to grow your wallets!",
      },
    ],
    // testimonial: {
    //   text: "I have personally provided HighLevel to all of my elite clients in my mentorship program, and they have been utilizing it for prospecting, sales, fulfillment, keeping things closer, making sure prospects never slip through the cracks, and utilizing things to save their time. If you’re considering using HighLevel, use it. It’s going to help your business scale!",
    //   author: "Alex Schlinsky",
    //   position: "Founder of Prospecting On Demand™",
    //   image: "/path-to-testimonial-image1.png", // replace with actual path
    // },
  },
  {
    image: Savings, // replace with actual path
    heading: "Supercharge Your Savings and Earnings with More Deals Club!",
    subheadings: [
      {
        title: "Everything You Need in One Platform",
        description:
          "More Deals Club offers a complete solution for maximizing your savings and rewards. Easily manage your referrals, track rewards, and access exclusive discounts all in one place.",
      },

      {
        title: "Sign Up Today and Start Earning!",
        description:
          "Join More Deals Club now and experience the ultimate platform for effortless savings and earnings. Don’t wait ! Unlock your benefits today!",
      },
    ],
  },
  {
    image: Rewards, // replace with actual path
    heading: "For Users",
    subheadings: [
      {
        title: "Daily Discounts",
        description: "Enjoy exclusive offers and discounts every single day.",
      },
      {
        title: "Earn Rewards",
        description: "Refer friends and earn cash rewards effortlessly.",
      },
      {
        title: "Sign Up Today and Start Earning!",
        description:
          "Join More Deals Club now and experience the ultimate platform for effortless savings and earnings. Don’t wait—unlock your benefits today!",
      },
    ],
  },
];

const Infodata2 = [
  {
    image: Growth2,
    heading: "Grow Your Business With More Deals Club!",
    subheadings: [
      {
        title: "All the Tools You Need in One Platform",
        description:
          "More Deals Club provides everything you need to boost your business. Manage your leads, track referrals, and increase sales effortlessly. Attract more customers and grow your business with our all-in-one platform.",
      },
      {
        title: "Sign Up Today and Grow Your Earning!",
        description:
          "Join More Deals Club now and discover the ultimate platform for increasing sales, gaining more customers, and enjoying daily discounts. Don’t miss out—start growing your business and savings today!",
      },
    ],
  },
  {
    image: Growth, // replace with actual path
    heading: "For Businesses",
    subheadings: [
      {
        title: "Increase Sales",
        description:
          "Attract more customers with our referral program and track your rewards seamlessly",
      },
      {
        title: "Earn More",
        description: "Gain new customers daily and watch your profits grow.",
      },
      {
        title: "Sign Up Today and Start Earning!",
        description:
          "Join More Deals Club now and discover the ultimate platform for increasing sales, gaining more customers, and enjoying daily discounts. Don’t miss out—start growing your business and savings today!",
      },
    ],
  },
];
const Infodata3 = [
  {
    image: Unlock,
    heading: "Join More Deals Club today and unlock a world of opportunities.",
    subheadings: [
      {
        title: "",
        description:
          "Our referral program not only increases your customer base but also keeps them engaged with exclusive daily discounts and offers. It's a win-win situation: you get more sales and loyal customers, and they get unbeatable deals. Don't wait any longer – sign up now and start transforming your business with More Deals Club!",
      },
    ],
  },
];

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["business types"],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}business/all/types/`);
      return response.data.data;
    },
    staleTime: 200000,
  });



  return (
    <div className="layout-wrapper">
      <Navbar />
      {/* <Hero /> */}
      {isLoading && <PartnerSkeleton />}
      {!isLoading && !isError && data &&  <Newhero data={data}/>}
   
      {/* <Divider/> */}
      {isLoading && <PartnerSkeleton />}
      {!isLoading && !isError && data &&  <PartnerSection  data={data}/>}
     
      {/* <Divider/> */}
      <Container>
      {/* <Row>
          <BusinessTypes />
        </Row> */}
        {" "}
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Restaurants </h4>
            <Link to="/morefood">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularResturant />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Hotels </h4>
            <Link to="/moreliving">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <Popularhotels />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Salons </h4>
            <Link to="/moresalons">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularSaloon />
        </Row>
      </Container>

      <Stat />

      <InfoContainer data={Infodata1} />
      <Divider />
      <Process />
      <Divider />
      <InfoContainer data={Infodata2} />
      <Divider />
      <Featuredtext>
        <h2 className="text-white">
          Join The Most Successful Marketers On The Planet
        </h2>
        <p className="text-white fs-6">
          Discover What More Deals Can Do For You & Your Business
        </p>
        <div className="container">
          <FreeButton />
        </div>
        <p className="text-white" style={{ fontSize: "10px" }}>
          NO OBLIGATIONS, NO CONTRACTS, CANCEL AT ANY TIME
        </p>
      </Featuredtext>
      <Divider />
      {/* <PricingCards /> */}
      <InfoContainer data={Infodata3} />
      <Divider />
      <section className="download-app-section">
        <Divider />
        <div className="download-app-content">
          <h2 className="text-white">Download the app for free.</h2>
          <div className="download-app-buttons">
            <a
              href="https://play.google.com/store/apps/details?id=com.moredelas.app&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="download-app-button"
            >
              <img
                src={playstore}
                alt="google play"
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="text-white">
                Available in
                <br />
                Google Play
              </h6>
            </a>
            <a href="#" className="download-app-button">
              <img
                src={appstore}
                alt="Apple Store"
                style={{ width: "40px", height: "40px" }}
              />
              <h6 className="text-white">
                Download from
                <br />
                App Store
              </h6>
            </a>
          </div>

          <div className="mt-4">
            <div className="container">
              <FreeButton />
            </div>
            <p className="text-white" style={{ fontSize: "10px" }}>
              NO OBLIGATIONS, NO CONTRACTS, CANCEL AT ANY TIME
            </p>
          </div>
        </div>
      </section>
      {/* <Featuredtext> */}
      {/*         <h2 className="text-white">Want to hear more success stories?</h2>

        <Testimonials /> */}
      {/* <div className="container">
          <FreeButton />
        </div>
        <p className="text-white" style={{ fontSize: "10px" }}>
          NO OBLIGATIONS, NO CONTRACTS, CANCEL AT ANY TIME
        </p>
      </Featuredtext> */}
      {/* <Divider /> */}
      
      {/* <Project heading="Our Projects" /> */}
      {/* <Divider /> */}
      <Footer />
    </div>
  );
};

export default Home;
