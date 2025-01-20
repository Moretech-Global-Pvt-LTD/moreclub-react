import React from "react";
import { useSelector } from "react-redux";
import { Button, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";


const HeaderUserInfo = () => {
  const user = useSelector((state) => state.userReducer);
  const business = useSelector((state) => state.businessReducer);
 

  function capitalizeFirstLetterOfEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="user-profile">
      {/* User Name */}
      <div className="user-name mb-1">
        {user?.user?.user_type === "NORMAL" ? (
          <div className="d-flex align-items-center user-profile">
            {!user.user?.user_profile?.display_picture ? (
              <div
                className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
              >
                {user.user?.first_name[0]}
                {user.user?.last_name[0]}
              </div>
            ) : (
              <img
                src={`${user.user?.user_profile?.display_picture}`}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "cover",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid rounded-circle mb-3 profile-image"
              />
            )}
            <div className="ms-3">
              <Link to="/profile">
                <h6 className="lh-1 text-dark fz-18">
                  {capitalizeFirstLetterOfEachWord(
                    `${user.user?.first_name} ${user.user?.last_name ?? ""}`
                  )}
                </h6>
              </Link>
              <Link to="/pricing">
                <span className="badge bg-primary fz-12">
                  {`${user?.membershipType?.membership_type?.name ?? ""}`}
                </span>
              </Link>
            </div>
          </div>
        ) : (
            
          <div className="d-flex align-items-center">
           
            {!business.businessProfile?.business_logo ? (
              <div
                className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
              >
                {`${!!business?.businessProfile?.business_name
                    ? business?.businessProfile?.business_name[0]
                    : user.user?.first_name[0] 
                  }`}
              </div>
            ) : (
              <img
                src={`${business?.businessProfile?.business_logo}`}
                style={{
                  width: "45px",
                  height: "45px",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid rounded-circle mb-3 profile-image"
              />
            )}

              
            <div className="ms-3">
                {business?.businessProfile?.business_name ?
                  <Link to="/business-profile">
                    <h6 className="lh-1 text-dark fz-18 line-clamp-1 ">
                      {capitalizeFirstLetterOfEachWord(
                        `${business?.businessProfile?.business_name ?? ""}`
                      )}
                    </h6>
                  </Link> :
                  <Link to="/business-profile">
                  <Button className="btn btn-warning btn-sm">
                    Add Business Info
                  </Button>
                  </Link>
                  // <Link to="/profile">
                  //   <h6 className="lh-1 text-dark fz-18">
                  //     {capitalizeFirstLetterOfEachWord(
                  //       `${user.user?.first_name} ${user.user?.last_name ?? ""}`
                  //     )}
                  //   </h6>
                  // </Link>
              }
                
              {/* <Link to="/pricing"> */}
                <span className="badge bg-primary fz-12">
                  {/* {`${user?.membershipType?.membership_type?.name ?? ""}`} */}
                  {`${user.user?.user_type}`}

                </span>
              {/* </Link> */}
            </div>
          </div>
        )}
      </div>

      {/* Balance */}
    </div>
  );
};

export default HeaderUserInfo;

const Skeletons = () => {
  return (
    <div className="user-name mb-1">
      <div className="d-flex align-items-center user-profile">
        <Placeholder as="div" animation="glow">
          <Placeholder
            xs={2}
            style={{ height: "20px", width: "20px", borderRadius: "50%" }}
          />
        </Placeholder>
        <div className="ms-3">
          <Placeholder as="a" animation="glow">
            <Placeholder xs={6} className="lh-1 text-dark fz-18" />
          </Placeholder>
          <Placeholder as="a" animation="glow">
            <Placeholder xs={4} className="badge bg-primary fz-12" />
          </Placeholder>
        </div>
      </div>
    </div>
  );
};
