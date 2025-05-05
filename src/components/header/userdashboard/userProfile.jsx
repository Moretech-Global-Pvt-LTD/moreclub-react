import { useSelector } from 'react-redux';
import './user-dashboard.css';

const Profile = () => {
  const user = useSelector((state) => state.userReducer);

  function capitalizeFirstLetterOfEachWord(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="user-dashboard-profile mb-0">
      {!user.user?.user_profile?.display_picture ? (
        <div
          className="partner-logo-wrapper mx-auto mb-2  d-flex justify-content-center align-items-center text-uppercase"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#fff",
          }}
        >
          {user.user?.first_name?.[0]}
          {user.user?.last_name?.[0]}
        </div>
      ) : (
        <img
          src={user.user?.user_profile?.display_picture}
          alt="Profile"
          className="user-dashboard-profile-img"
        />
      )}

      <h5>
        {capitalizeFirstLetterOfEachWord(
          `${user.user?.first_name ?? ""} ${user.user?.last_name ?? ""}`
        )}
      </h5>

      {/* <p>{user.user?.user_type} {"member"}</p> */}
      <p>MEMBER</p>
    </div>
  );
}

export default Profile;
