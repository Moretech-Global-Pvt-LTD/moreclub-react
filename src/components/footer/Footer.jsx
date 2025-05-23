import FooterNav from "./FooterNav";
import LeftWidget from "./LeftWidget";
import FooterWidget from "./FooterWidget";

import { useSelector } from "react-redux";
import CookieConsentBanner from "../Layout/CookiesConsent";

export default function Footer() {
  const metainfo = useSelector((state) => state.metaReducer);

  const navlist = [
    {
      text: "About Us",
      url: "/about",
    },
    {
      text: "Events",
      url: "/event",
    },
    {
      text: "Our Products",
      url: "/products",
    },
    {
      text: "Our Partners",
      url: "/partners",
    },
  ];
  const extendedNavlist = [
    {
      text: "About Us",
      url: "/about",
    },
    {
      text: "Events",
      url: "/event",
    },
    {
      text: "Pricing",
      url: "/pricing",
    },

    {
      text: "Our Products",
      url: "/products",
    },
    {
      text: "Our Partners",
      url: "/partners",
    },
  ];

  return (
    <footer
      className="footer-area"
      style={{ paddingTop: "20px", paddingBottom: "20px" }}
    >
     
      <div className="container">
        <div className="row">
          <LeftWidget
            lightLogo={`${metainfo.meta?.black_logo}`}
            darkLogo={`${metainfo.meta?.white_logo}`}
            subText={`${metainfo.meta?.description}`}
            contactInfo={`Email: ${metainfo.meta?.email}`}
            socialVisibility="visible"
            socialTitle="Join the community"
            socialLists={[
              {
                tootipPosition: "top",
                title: "Facebook",
                icon: "img/core-img/icons8-facebook.svg",
                url: "https://www.facebook.com/MoreTechGlobal",
              },
              {
                tootipPosition: "top",
                title: "Twitter",
                icon: "img/core-img/icons8-twitter.svg",
                url: "/",
              },
              {
                tootipPosition: "top",
                title: "Instagram",
                icon: "img/core-img/icons8-instagram.svg",
                url: "https://www.instagram.com/moretechglobal/",
              },
              // {
              //     tootipPosition: "top",
              //     title: "Slack",
              //     icon: "img/core-img/icons8-slack.svg",
              //     url: "/"
              // },
              // {
              //     tootipPosition: "top",
              //     title: "Youtube",
              //     icon: "img/core-img/icons8-player.svg",
              //     url: "/"
              // }
            ]}
            newsletterVisibility="visible" // try 'visible' or 'hidden'
          />

          {/* Footer Widget */}
          <div className="col-12 col-lg-7">
            <div className="row g-4">
              {/* Single Widget */}
              <FooterWidget
                widgetTitle="Explore"
                navList={
                  !!sessionStorage.getItem("moretechglobal_access")
                    ? extendedNavlist
                    : navlist
                }
              />

              {/* Single Widget */}
              <FooterWidget
                widgetTitle="Marketplace"
                navList={[
                  {
                    text: "Art",
                    url: "#",
                  },
                  {
                    text: "Cards",
                    url: "#",
                  },
                  {
                    text: "Collectibles",
                    url: "#",
                  },
                  {
                    text: "Domain",
                    url: "#",
                  },
                  {
                    text: "Photos",
                    url: "#",
                  },
                  {
                    text: "Sports",
                    url: "#",
                  },
                  {
                    text: "Videos",
                    url: "#",
                  },
                ]}
              />

              <FooterWidget
                widgetTitle="Company"
                navList={[
                  {
                    text: "Licences",
                    url: "/liscence",
                  },
                  {
                    text: "FAQ's",
                    url: "/faq",
                  },
                  {
                    text: "Support",
                    url: "/support",
                  },
                  {
                    text: "Conditions",
                    url: "/terms",
                  },
                  {
                    text: "Privacy",
                    url: "/privacy",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copywrite-wrapper d-lg-flex align-items-lg-center justify-content-lg-between">
          <div className="copywrite-text text-center text-lg-start mb-3 mb-lg-0">
            <p className="mb-0">
              {"2024"} © All rights reserved by{" "}
              <a
                href="https://moretechglobal.com/"
                target="_blank"
                rel="noreferrer"
              >
                MoreTech Global
              </a>
            </p>
          </div>
          <FooterNav
            navList={[
              {
                title: "Privacy Policy",
                link: "/privacy",
              },
              {
                title: "Terms & Conditions",
                link: "/terms",
              },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}
