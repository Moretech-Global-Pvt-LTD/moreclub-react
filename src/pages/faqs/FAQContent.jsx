import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FAQimage from "../../images/about/expectation.png";
import { baseURL } from "../../config/config";
import axios from "axios";
import { message } from "antd";
import { axiosInstance } from "../..";
import SupportCard from "../../components/cards/SupportCard";
import Recommendations from "../Support/Recommendations";

const FAQContent = () => {
  const [faq, setFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletionReason, setDeletionReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  // const [activeKey, setActiveKey] = useState(null);
  const [showdelete, setShowDelete] = useState(false);

 

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await axios.get(`${baseURL}meta/faq/`);
        setFaq(res.data.data);
      } catch (err) {
        setFaq(null);
      }
    };

    fetchFaq();
  }, []);

  const handleReasonOnchange = async (e) => {
    const value = e.target.value;
    if (value !== "") {
      setDeletionReason(e.target.value);
      setReasonError("");
    } else {
      setReasonError("Please provide your reason");
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Reason for deletion:", deletionReason);
    if (deletionReason.trim() !== "") {
      setReasonError("");
      await handleDelete();
      toggleModal(false);
    } else {
      setReasonError("Please provide your reason");
    }
  };

  async function handleDelete() {
    try {
      await axiosInstance.post(
        `${baseURL}auth/delete/user/account/`,
        {
          remark: deletionReason,
        }
      );
      message.error("account deleted Successfully");
      window.location.replace("/login");
    } catch (err) {
      message.error(err.response?.data?.errors?.non_fields_error[0]);
    }
  }

  return (
    <>
      <h1 className="text-center mb-2">Frequently Asked Questions</h1>
      <Row className="align-items-center d-flex flex-md-row">
        <Col md={6}>
          <div className="about-content">
            <h2>Benifits from Referals</h2>
            <p>
              With every successful referral, our members receive kickbacks from
              the purchases made by their referred clients within our partner
              network. These kickbacks serve as a token of appreciation for
              their pivotal role in expanding our network and enriching our
              platform's value proposition. This system creates a mutually
              beneficial scenario: new members gain access to our premium
              services and benefits, while existing members are rewarded for
              their advocacy and contribution to our platform's growth.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="image-container">
            <img src={FAQimage} alt="faqs-1" className="img-fluid" />
          </div>
        </Col>
      </Row>

      

      <Row>
        <Col xs={12} lg={8}>
          {faq && (
            <>
              {faq.map((item, index) => (

                <Row className="align-items-center d-flex flex-md-row" key={`${item.question}-${index}`}>
                  <Col xs={12}>
                    <div className="about-content">
                      <h4 >{item.question}</h4>
                      <p className="text-dynamic-white">
                        {item.answer}
                      </p>
                    </div>
                  </Col>
                </Row>
              ))}
              <Row className="align-items-center d-flex flex-md-row" >
                <Col xs={12}>
                  <div className="about-content ">
                    <h4>How to delete my Account ?</h4>
                    <p>
                      <p>
                        To delete your account, click the "Delete Account" button at the
                        bottom of this question.
                      </p>
                      <p className="fw-bold">
                        Read the Following Guidelines before you delete your account
                      </p>
                      <ol>
                        <li>
                          All your data, including personal information, saved
                          preferences, and content you've created, will be permanently
                          removed from our servers. This process is irreversible.
                        </li>
                        <li>
                          Once your account is deleted, it cannot be recovered. To use
                          our services again, you will need to create a new account.
                        </li>
                        <li>
                          Deleting your account will cancel all active subscriptions
                          associated with your account. Any remaining subscription
                          period will not be refunded.
                        </li>
                        <li>
                          The account deletion process is immediate, but it may take up
                          to 30 days for all your data to be fully removed from our
                          backup systems.
                        </li>
                        <li>
                          We recommend resolving any pending orders or transactions
                          before deleting your account. Deleting your account will
                          cancel any ongoing transactions.
                        </li>
                        <li>
                          You can also contact our customer support team to request
                          account deletion. They will guide you through the process and
                          confirm your request.
                        </li>
                        <li>
                          If you face any problems while attempting to delete your
                          account, please reach out to our customer support team for
                          assistance.
                        </li>
                        <li>
                          All your activity, including posts, comments, and
                          interactions, will be deleted along with your account,
                          ensuring complete removal of your presence from our platform.
                        </li>
                        <li>
                          You can delete your account from both the website and the
                          mobile app. The process is similar in both, located within the
                          account settings section.
                        </li>
                      </ol>
                    </p>
                    <button
                      className="btn btn-danger btn-sm my-2 mx-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => toggleModal(true)}
                    >
                      Delete Account
                    </button>
                  </div>
                </Col>
                </Row>
            </>
          )}

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          size="lg"
          centered
          show={isModalOpen}
          onHide={toggleModal}
          
        >
         
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter text-center " className="text-dynamic-white">
              Delete Your Account
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formDeletionReason">
                <Form.Label>Reason for Account Deletion</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter your reason"
                  style={{ height: "100px", backgroundColor: "transparent" }}
                  value={deletionReason}
                  isInvalid={reasonError}
                  onChange={handleReasonOnchange}
                  required
                />
              </Form.Group>
              <div className="d-flex gap-2 justify-content-end my-2">
                <Button variant="secondary" onClick={() => toggleModal(false)}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  disabled={
                    deletionReason.trim() === "" || reasonError.trim() !== ""
                  }
                >
                  Delete Account
                </Button>
              </div>
             
            </Form>
          </Modal.Body>
           
        </Modal>
        </Col>
        <Col xs={12} lg={4}>
        <SupportCard 
        title="Need Help?"
        description="Our support team is here to help you 24/7. Reach out to us anytime and we'll be happy to assist."
        buttonText="Get Support"
        buttonLink="/support" 
      />
        <h4 className="text-dynamic-white">Recent Posts</h4>
          <Recommendations />
        </Col>
      </Row>
    </>
  );
};

export default FAQContent;
