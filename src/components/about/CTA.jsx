import { Link } from "react-router-dom";
import Divider from "../divider/Divider";

export default function CTA(props) {
  const {
    backgroundColor,
    title,
    buttonText,
    buttonColor,
    buttonURL,
    buttonIcon,
  } = props;

  return (
    <div class="container mt-6">
      <Divider />
      <div class="cta-text bg-gradient p-4 p-sm-5 bg-primary">
        <div class="row align-items-center">
          <div class="col-12 col-md-8 col-lg-9">
            <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
              <h2 class="mb-3 fw-bold mb-md-0">{title}</h2>
            </div>
          </div>
          <div class="col-12 col-md-4 col-lg-3">
            <div class="text-md-end">
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <Link class="btn btn-warning rounded-pill" to={buttonURL}>
                  <i class=""></i>Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
