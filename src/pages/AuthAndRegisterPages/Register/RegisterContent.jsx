import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RegisterPic from "../../../images/auth/register.png";
import RegistrationForm from "./RegisterForm";

const RegisterContent = (props) => {
  const { title, subTitle, button } = props;
  const url = new URL(window.location.href);
  const nextParam = url.searchParams.get("next");

   const iframeRef = useRef(null);
  
    const adjustIframeHeight = () => {
      const iframe = iframeRef.current;
      const aspectRatio = 9 / 16; // 16:9 aspect ratio
      const width = iframe.clientWidth;
      const height = width * aspectRatio;
      iframe.style.height = `${height}px`;
    };
  
    useEffect(() => {
      adjustIframeHeight();
      window.addEventListener("resize", adjustIframeHeight);
  
      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", adjustIframeHeight);
      };
    }, []);

  return (
    <div className="container">
      <div className="row g-4 g-lg-5 align-items-start justify-content-between">
        <div className="col-12 col-md-6 col-lg-6 col-xl-6  mt-0">
          <div className="register-thumbnail mt-0  mt-md-2 mt-lg-5">
            <h2>{title}</h2>
            <p>
              {subTitle}
              {nextParam ? (
                <Link className="ms-1 hover-primary" to={`/login?next=${encodeURIComponent(nextParam)}`}>
                  {button[0].text}
                </Link>  
              ): (
              <Link className="ms-1 hover-primary" to={button[0].path}>
                {button[0].text}
              </Link>
              )
            
            }
            </p>
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10 col-xl-10   ">
                {/* <img
                  src={RegisterPic}
                  alt="Register"
                  className="d-none d-md-block"
                /> */}
                <div className="row video-container">
              
                
              <iframe
                ref={iframeRef}
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/l4YhB0KsYUo?loop=1&playlist=l4YhB0KsYUo&fs=0&color=white&rel=0&modestbranding=1&controls=1&disablekb=0&autoplay=1&mute=1"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-6 mt-3 mt-md-2 mt-lg-5">
          <div className="row justify-content-start">
            <div className="col-12 col-xl-12 ">
              <RegistrationForm subTitle={subTitle} button={button} />
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RegisterContent;
