import { Link } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import SubscriptionMailForm from "./SubscriptionMailForm";

export default function LeftWidget(props) {
  const {
    lightLogo,
    darkLogo,
    subText,
    contactInfo,
    socialVisibility,
    socialTitle,
    socialLists,
    newsletterVisibility,
  } = props;

  const socialItems = socialLists.map((item, index) => (
    <OverlayTrigger
      key={index}
      placement={item.tootipPosition}
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id={`tooltip-${item.title}`}>{item.title}</Tooltip>}
    >
      <a href={item.url} target="_blank" rel="noreferrer">
        <i className={item.icon}></i>
        <img src={`${process.env.PUBLIC_URL}/${item.icon}`} alt="" />
      </a>
    </OverlayTrigger>
  ));

  return (
    <div className="col-12 col-lg-5">
      <div className="footer-widget-area mb-70 pe-lg-4 pe-xl-5 me-lg-4 me-xl-5 border-end">
        <Link className="d-flex align-items-center mb-4 " to="/">
          <img
            className="light-logo"
            src={lightLogo}
            alt="Light"
            style={{ width: "120px" }}
          />
          <img
            className="dark-logo"
            src={darkLogo}
            alt="Dark"
            style={{ width: "120px" }}
          />
        </Link>

        <p dangerouslySetInnerHTML={{ __html: subText }}></p>        
        <p
          className="mb-0"
          dangerouslySetInnerHTML={{ __html: contactInfo }}
        ></p>

        <div className={`section-${socialVisibility}`}>
          <h5 className="mt-4 mb-3">{socialTitle}</h5>
          <div className="footer-social-icon d-flex align-items-center flex-wrap">
            {socialItems}
          </div>
        </div>

        <div className={`section-${newsletterVisibility}`}>
          <div className="newsletter-form mt-5 me-5">
            <SubscriptionMailForm />
          </div>
        </div>
      </div>
    </div>
  );
}
