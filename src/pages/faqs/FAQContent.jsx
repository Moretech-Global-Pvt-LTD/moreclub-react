import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import FAQimage from "../../images/about/expectation.png";
import { baseURL } from "../../config/config";
import axios from "axios";
import { Modal, Space, message } from "antd";
import { axiosInstance } from "../..";

const FAQContent = () => {
  const [faq, setFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  async function handleDelete() {
    try {
      const res = await axiosInstance.post(
        `${baseURL}auth/delete/user/account/`,
        {
          remark: "",
        }
      );
      console.log(res);
      message.error("account deleted Successfully");
    } catch (err) {
      console.log(err);
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
        <Accordion>
          {faq && (
            <>
              {faq.map((item, index) => (
                <Accordion.Item
                  eventKey={`${item.question}-${index}`}
                  className="text-dynamic-white"
                >
                  <Accordion.Header className="text-dynamic-white">
                    {item.question}
                  </Accordion.Header>
                  <Accordion.Body className="text-dynamic-white">
                    {item.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
              <Accordion.Item
                eventKey={`how to delete`}
                className="text-dynamic-white"
              >
                <Accordion.Header className="text-dynamic-white">
                  How to delete my Account ?
                </Accordion.Header>
                <Accordion.Body className="text-dynamic-white">
                  <p>
                    To delete your account, click the "Delete Account" button at
                    the bottom of this question.
                  </p>
                  <p>
                    Read the Following Guidelines before you delete your account
                  </p>
                  <p>
                    All your data, including personal information, saved
                    preferences, and content you've created, will be permanently
                    removed from our servers. This process is irreversible.
                  </p>
                  <p>
                    Once your account is deleted, it cannot be recovered. To use
                    our services again, you will need to create a new account.
                  </p>
                  <p className="fs-6 mt-2 border-bottom border-top  py-2">
                    <Space>
                      <button
                        className="btn btn-danger btn-sm "
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleModal(0, true)}
                      >
                        Delete Account
                      </button>
                    </Space>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </>
          )}
          {!faq && (
            <div>
              <h6 className="text-center">FAQs not avaliable</h6>
            </div>
          )}
        </Accordion>
        {/* <button
          className="btn btn-danger btn-sm "
          style={{ cursor: "pointer" }}
          // onClick={() => toggleModal(0, true)}
          onClick={handleDelete}
        >
          Delete Account
        </button>

        <Modal
          title="Basic Modal"
          open={isModalOpen[0]}
          onOk={() => toggleModal()}
          onCancel={() => toggleModal()}
          // footer="Footer"
          // classNames={classNames}
          // styles={modalStyles}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal> */}
      </Row>
    </>
  );
};

export default FAQContent;
