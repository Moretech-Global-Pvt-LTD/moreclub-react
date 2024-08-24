import React from "react";
import { Link } from "react-router-dom";

const Navbutton = ({ signin, register }) => {
  const url = new URL(window.location.href);
  const nextParam = url.searchParams.get("next");
  
    return (
      <>
        {!!register && (
          <>
            {nextParam ?
              <Link className="ms-2" to={`/register-membership?next=${encodeURIComponent(nextParam)}`}>
                <h5 className="bg-danger text-white text-center mb-0 px-3 py-2">
                  <i className="bi bi-box-arrow-in-right me-1" />
                  Register Now
                </h5>
              </Link > :
              <Link className="ms-2" to={`/register-membership`}>
                <h5 className="bg-danger text-white text-center mb-0 px-3 py-2">
                  <i className="bi bi-box-arrow-in-right me-1" />
                  Register Now
                </h5>
              </Link >

            }
          </>
        )}
        {!!signin && (
          <>{nextParam ?
            <a className="ms-2" href={`/login?next=${encodeURIComponent(nextParam)}`}>
              <h5 className="bg-danger text-white text-center mb-0 px-3 py-2">
                <i className="bi bi-box-arrow-in-right me-1" />
                Sign In
              </h5>
            </a>
            :
          <a className="ms-2" href="/login">
            <h5 className="bg-danger text-white text-center mb-0 px-3 py-2">
              <i className="bi bi-box-arrow-in-right me-1" />
              Sign In
            </h5>
            </a>
          }
            </>
        )}
      </>
    );
  };

  export default Navbutton;
