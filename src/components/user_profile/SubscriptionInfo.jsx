import React from "react";
import { Link } from "react-router-dom";
import { parseMembershipData } from "../../utills/utility";

const SubscriptionInfo = ({ user }) => {
  const features = user.membershipType?.membership_type
    ? parseMembershipData(user.membershipType?.membership_type)
    : [];

  return (
    <>
      <h4 className="linked-heading">
        Subscription{" "}
        {/* <Link className="btn btn-link" to={`/pricing`}>
          Change Plan
        </Link> */}
      </h4>
      <div class="name-info d-flex align-items-center mb-3">
        <div className="author-img position-relative">
          <img
            className="shadow"
            src={`${user.membershipType.membership_type?.icon}`}
            alt=""
          />
          <i class="bi bi-check position-absolute bg-success true"></i>
        </div>
        <div class="name-author">
          <span
            class="name d-block hover-primary text-truncate text-dynamic-white fw-bold"
            // href={`/buy/coupon/${coupon.id}`}
          >
            {user.membershipType.membership_type?.name}
          </span>
          <span
            class="author d-block hover-primary text-truncate text-dynamic-white fw-bold"
            // href={`/buy/coupon/${coupon.id}`}
          >
            {user.membershipType.package_time}
          </span>
          <Link className="author d-block fz-12 hover-primary text-truncate">
            {user.membershipType.membership_type?.code === "free" ? (
              <>
                Expires at: <i className="bi bi-calendar-date" /> No expiry date
              </>
            ) : (
              <>
                Expires at: <i className="bi bi-calendar-date" />{" "}
                {user.membershipType?.expiration_date?.slice(0, 10)}
              </>
            )}
          </Link>
        </div>
      </div>
      <h6>INCLUDES</h6>
      <div className="d-flex flex-column gap-1 ps-3">
        {features.map((feature, index) => (
          <Link
            to={feature.websiteUrl}
            target="_blank"
            key={index}
            className={`text-dynamic-white fw-medium fs-6`}
          >
            <i className="bi bi-check me-2 text-success fs-4"></i>{" "}
            {feature.discounts.toUpperCase()}
          </Link>
        ))}
      </div>
    </>
  );
};

export default SubscriptionInfo;
