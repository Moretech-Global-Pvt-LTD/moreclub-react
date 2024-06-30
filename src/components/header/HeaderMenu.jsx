import { Link } from "react-router-dom";

export default function HeaderMenu() {
  return (
    <div className="ms-auto me-auto">
      <div class="navbar-nav navbar-nav-scroll navbar-collapse collapse">
        <div class="ft-dd nav-item ">
          <Link
            id="Home"
            aria-expanded="false"
            role="button"
            class="nav-link"
            tabindex="0"
            to="/"
          >
            Home
          </Link>
        </div>

        <div class="ft-dd nav-item ">
          <Link
            id="About"
            aria-expanded="false"
            role="button"
            class=" nav-link"
            tabindex="0"
            to="/about"
          >
            About
          </Link>
        </div>
        <div class="ft-dd nav-item ">
          <Link
            id="Pricing"
            aria-expanded="false"
            role="button"
            class="nav-link"
            tabindex="0"
            to="/pricing"
          >
            Pricing
          </Link>
        </div>
        <div class="ft-dd nav-item ">
          <Link
            id="Event"
            aria-expanded="false"
            role="button"
            class="nav-link"
            tabindex="0"
            to="/event"
          >
            Event
          </Link>
        </div>
        <div class="ft-dd nav-item ">
          <Link
            id="Products"
            aria-expanded="false"
            role="button"
            class="nav-link"
            tabindex="0"
            to="/products"
          >
            Our Products
          </Link>
        </div>
        <div>
          <Link
            id="Partners"
            aria-expanded="false"
            role="button"
            class="nav-link"
            tabindex="0"
            to="/partners"
          >
            Our Partners
          </Link>
        </div>
      </div>
    </div>
  );
}
