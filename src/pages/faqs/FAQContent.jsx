import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import FAQimage from "../../images/about/expectation.png";
import { baseURL } from "../../config/config";
import axios from "axios"

const FAQContent = () => {

    const [faq, setFaq] = useState(null);

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
          {faq &&
            faq.map((item, index) => (
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
            {!faq && 
            <div>
                <h6 className="text-center">FAQs not avaliable</h6>
            </div>
            }
        </Accordion>
      </Row>
    </>
  )
}

export default FAQContent
