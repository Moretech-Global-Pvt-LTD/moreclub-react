import { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/api/loginAPI";
import Cookies from "js-cookie";
import { setAccessToken, setRefressToken } from "../../utills/token";


const InactivityLogout = ({ inactivityTime = 30 * 60 * 1000 }) => {
  const timerRef = useRef();
  const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    

      const refreshTokens = () => {
          const accessToken = Cookies.get("moretechglobal_access");
          const refreshToken = Cookies.get("moretechglobal_refresh");
        if (accessToken) {
          // Call your function to set a new access token
          setAccessToken(accessToken); // This should reset the expiration
        }
          if (refreshToken) { 
              setRefressToken(refreshToken);
          }
      };


  // Logout function to remove access token and redirect user
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  // Debounced function to reset inactivity timer on user interaction
  const handleActivity = debounce(() => {
      clearTimeout(timerRef.current);
    refreshTokens();
    timerRef.current = setTimeout(() => setShowModal(true), inactivityTime); // Show modal after inactivity
  }, 300);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "touchstart"];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    // Set the initial inactivity timer when the component mounts
    timerRef.current = setTimeout(() => setShowModal(true), inactivityTime);

    return () => {
      clearTimeout(timerRef.current); // Clear timer on cleanup
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, [handleActivity, inactivityTime]);

  // Handle closing the modal by logging the user out
  const handleModalClose = () => {
    setShowModal(false); // Close the modal
    handleLogout(); // Call logout after closing modal
  };

  return (
    <>
      {/* React-Bootstrap Modal */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showModal}
        onHide={handleModalClose}
      >
        <Modal.Header>
          <Modal.Title className="text-dynamic-white">
            Session Expired
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dynamic-white">
          <p>
            Your session has expired due to inactivity. Please click "OK" to log
            out and log in again.{" "}
          </p>
          <div className="d-flex w-100 justify-content-end">
            <Button
              variant="primary"
              onClick={handleModalClose}
              className="ms-auto "
              size="sm"
            >
              Logout
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default InactivityLogout;


