import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/api/loginAPI";
import DashboardLayout from "../../components/Layout/DashboardLayout";
// import { axiosInstance } from "../..";
// import { baseURL } from "../../config/config";

const Settingpage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.userReducer);

  // const [permisions, setPermissions]= useState();

  // const fetchPermissions = async () => {
  //   try {
  //     const res = await axiosInstance.get(`${baseURL}permissions/list/`);
  //     setPermissions(res.data.data);
  //   } catch (err) {
  //     console.error("error fetching permisions", err);
  //   }
  // };

  // useEffect(()=>{
  //   fetchPermissions();
  // },[])

  const logOut = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <DashboardLayout title={"Settings"}>
      <div className="row mt-1 g-2">
        <div className="col-12  col-md-9">
          <div className="nft-card card shadow-sm mb-4 p-4">
            <h4 className="linked-heading">Settings </h4>
            {/* <span className="btn btn-link">View All</span> */}
            <ul className="row">
              <Link to="/profile">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2 cursor">
                  {" "}
                  My Profile
                </p>
              </Link>
              <Link to="/profile/change">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                  {" "}
                  Update Profile
                </p>
              </Link>
              {user.user?.user_type !== "NORMAL" && (
                <>
                  <Link to="/business-profile">
                    <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                      {" "}
                      My Business Profile
                    </p>
                  </Link>
                  <Link to="/business/update">
                    <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                      {" "}
                      Update Business Profile
                    </p>
                  </Link>
                </>
              )}

              <Link to="/change-password">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                  Change Password
                </p>
              </Link>
              <Link to="/transactions-pin-change">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                  Change Transaction PIN
                </p>
              </Link>
              {/* <Link to="/">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">
                  Help and Support
                </p>
              </Link> */}
              <Link to="/faq">
                <p className="fs-6 mt-2 mb-2 border-bottom pb-2">FAQs</p>
              </Link>
              <p className="fs-6 mt-2 border-bottom pb-2">
                <button
                  className="btn btn-warning btn-sm "
                  style={{ cursor: "pointer" }}
                  onClick={logOut}
                >
                  Log out
                </button>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settingpage;
