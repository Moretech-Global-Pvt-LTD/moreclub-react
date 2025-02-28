import React from "react";
import { Carousel } from "react-bootstrap";
import "./heroCarousel.css";
import { morefoodPublicAxios } from "../../utills/axios/morefoodaxios";
import { moresalonPublicAxios } from "../../utills/axios/moresalonaxios";
import { useQuery } from "@tanstack/react-query";

const getOffers = async (activeIndex) => {
  console.log("active Index", activeIndex);
  // if(activeIndex === "Restaurant"){
  //     const response = await morefoodPublicAxios.get(`offers/list/`);
  //     return response.data.data;
  // }

  // if(activeIndex === "Salons"){
  //     const response = await moresalonPublicAxios.get(`offers/list/`);
  //     return response.data.data;
  // }

  const dummyOffers = {
    Restaurant: [
      {
        title: "Weekend Feast",
        content: "Enjoy a special buffet with 30% off.",
        banner:
          "https://cdn.pixabay.com/photo/2022/03/29/03/40/food-7098703_1280.jpg",
      },
      {
        title: "Happy Hour",
        content: "Buy one get one free on drinks.",
        banner:
          "https://cdn.pixabay.com/photo/2022/06/23/09/43/drinks-7279423_960_720.jpg",
      },
      {
        title: "Lunch Combos",
        content: "Flat 25% off on meal combos.",
        banner:
          "https://cdn.pixabay.com/photo/2021/12/30/11/33/italian-cuisine-6903774_1280.jpg",
      },
      {
        title: "Couple's Dinner",
        content: "Special dinner for two with a 20% discount.",
        banner:
          "https://cdn.pixabay.com/photo/2022/03/29/03/40/food-7098703_1280.jpg",
      },
      {
        title: "Kids Eat Free",
        content: "Kids below 10 eat free on Sundays!",
        banner:
          "https://cdn.pixabay.com/photo/2014/01/23/19/34/french-fries-250641_960_720.jpg",
      },
      {
        title: "Chef’s Special",
        content: "Exclusive discounts on chef’s signature dishes.",
        banner:
          "https://cdn.pixabay.com/photo/2017/08/22/00/29/burger-2667443_1280.jpg",
      },
      {
        title: "Unlimited Pizza Night",
        content: "All-you-can-eat pizza at 50% off.",
        banner:
          "https://cdn.pixabay.com/photo/2023/03/20/04/09/pizza-7863713_1280.jpg",
      },
      {
        title: "Dessert Delight",
        content: "Get a free dessert with every main course.",
        banner:
          "https://cdn.pixabay.com/photo/2020/05/11/15/06/food-5158702_1280.jpg",
      },
      {
        title: "Loyalty Rewards",
        content: "Earn points and redeem for free meals.",
        banner:
          "https://cdn.pixabay.com/photo/2017/05/04/21/23/cupcakes-2285209_1280.jpg",
      },
      {
        title: "Early Bird Offer",
        content: "Save 20% on orders before 7 PM.",
        banner:
          "https://cdn.pixabay.com/photo/2024/05/06/17/06/french-fries-8743802_1280.jpg",
      },
    ],
    Salons: [
      {
        title: "Salon Discounts",
        content: "Get 20% off on haircuts.",
        banner:
          "https://images.pexels.com/photos/7986976/pexels-photo-7986976.jpeg?auto=compress&cs=tinysrgb&w=400",
      },
      {
        title: "Spa Specials",
        content: "Relax with our exclusive spa deals.",
        banner:
          "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Bridal Packages",
        content: "Exclusive bridal makeover offers!",
        banner:
          "https://images.pexels.com/photos/1654834/pexels-photo-1654834.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Manicure & Pedicure",
        content: "Book a manicure and get a pedicure 50% off.",
        banner:
          "https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Hair Spa",
        content: "Enjoy deep conditioning hair spa at discounted prices.",
        banner:
          "https://images.pexels.com/photos/3993443/pexels-photo-3993443.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    Marketplace: [
      {
        title: "Flash Sales",
        content: "Limited-time deals on top products.",
        banner:
          "https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Bundle Offers",
        content: "Buy more, save more!",
        banner:
          "https://images.pexels.com/photos/7957753/pexels-photo-7957753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        title: "Cashback Deals",
        content: "Get up to 20% cashback on purchases.",
        banner:
          "https://images.pexels.com/photos/3905874/pexels-photo-3905874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      
    ],
    Hotel: [
      {
        title: "Luxury Stay",
        content: "Exclusive hotel discounts available now.",
        banner:
          "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Weekend Getaways",
        content: "Plan your perfect trip today!",
        banner:
          "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      
      {
        title: "Business Traveler Discounts",
        content: "Special rates for corporate bookings.",
        banner:
          "https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Group Bookings",
        content: "Get extra discounts for bulk reservations.",
        banner:
          "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        title: "Loyalty Rewards",
        content: "Earn points and get free stays.",
        banner:
          "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
  };

  return (
    dummyOffers[activeIndex] || [
      {
        title: "Exclusive Deals",
        content: "Get the latest deals and discounts.",
        banner:
          "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/offer/food3_dgpw6v",
      },
      {
        title: "Exclusive Deals",
        content: "Get the latest deals and discounts.",
        banner:
          "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/offer/food3_dgpw6v",
      },
      {
        title: "Exclusive Deals",
        content: "Get the latest deals and discounts.",
        banner:
          "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/offer/food3_dgpw6v",
      },
    ]
  );
};

const getBackgroundColor = () => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4D03F", "#9B59B6"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const HeroCarousel = ({ activeIndex }) => {
  const {
    data: offers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["business offers", activeIndex],
    queryFn: async () => await getOffers(activeIndex),
    staleTime: 200000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error getting offers...</p>;

  const layoutConfig = [[], [1], [2], [1, 2], [1, 3], [2, 3]][
    Math.min(offers.length, 5)
  ];

  return (
    <div className="hero-carousel-container">
      <Carousel
        className="rounded-4"
        indicators={false}
        controls={true}
        interval={null}
      >
        <Carousel.Item className="d-none d-lg-block">
          
          <div className="carousel-item-container row-1 w-100">
            {offers.slice(0, layoutConfig[0]).map((item, index, array) => (
              <CarouselCard
                key={index}
                item={item}
                width={`${100 / array.length}%`}
              />
            ))}
          </div>
          {layoutConfig.length > 1 && (
            <div className="carousel-item-container row-2">
              {offers
                .slice(layoutConfig[0], layoutConfig[0] + layoutConfig[1])
                .map((item, index, array) => (
                  <CarouselCard
                    key={index}
                    item={item}
                    width={`${100 / array.length}%`}
                  />
                ))}
            </div>
          )}
        </Carousel.Item>
        <Carousel.Item className="d-block d-lg-none">
          
          <div className="carousel-item-container row-1 w-100">
            {offers.slice(0, layoutConfig[0]).map((item, index, array) => (
              <CarouselCard
                key={index}
                item={item}
                width={`${100 / array.length}%`}
              />
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroCarousel;

export const CarouselCard = ({ item, width }) => {
  return (
    <>
    
    <div
      className="custom-card position-relative d-none d-lg-block"
      style={{ background: item.banner ? "none" : getBackgroundColor(), width }}
    >
      {item.banner && (
        <img
          src={item.banner}
          alt={item.title || "Offer"}
          className="custom-card-image w-100 h-100 position-relative"
          style={{ objectFit: "cover" }}
        />
      )}
      <div
        className={`position-absolute top-0 left-0 bg-dark bg-opacity-50 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white rounded-5`}
      >
        <h3 className="text-white text-left">{item.title || item.name}</h3>
        <p className="text-white text-left fs-4 fw-normal">
          {item.content || item.description}
        </p>
      </div>
    </div>
    <div
      className="custom-card position-relative d-block d-lg-none" 
      style={{ background: item.banner ? "none" : getBackgroundColor(), width:"100%" }}
    >
      {item.banner && (
        <img
          src={item.banner}
          alt={item.title || "Offer"}
          className="custom-card-image w-100 h-100 position-relative"
          style={{ objectFit: "cover" }}
        />
      )}
      <div
        className={`position-absolute top-0 left-0 bg-dark bg-opacity-50 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white rounded-5`}
      >
        <h3 className="text-white text-left">{item.title || item.name}</h3>
        <p className="text-white text-left fs-4 fw-normal">
          {item.content || item.description}
        </p>
      </div>
    </div>
    </>
  );
};
