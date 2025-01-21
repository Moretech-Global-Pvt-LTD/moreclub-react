import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Form, Modal } from "react-bootstrap";
import { message } from "antd";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const LeadMessageContent = ({ network, onClose, onFinish }) => {
  const [sendMethod, setSendMethod] = useState("email");
  const [messages, setMessages] = useState("");
  const [subject, setSubject] = useState("");
  const [sms, setsms] = useState("");
  const [isCancel, setIsCancel] = useState(false);

  const editorRef = useRef(null);
  const maxChars = 160;

  const handleSMSChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setsms(value); // Set value only if it's within the limit
    }
  };

  const handleEditorReady = (editor) => {
    editorRef.current = editor;
  };

  const handleCancel = () => {
    setMessages("");
    if (editorRef.current) {
      editorRef.current.setData("");
    }
    setSubject("");
    setsms("");
    setIsCancel(false);
    onClose();
  };

  const sendmessage = async (data) => {
    try {
      const res = await axiosInstance.post(`${baseURL}leads/send/sms/${network.username}/`, data);
      message.success("message sent");
      
      console.log(res.data);
      // const newmessage = {
      //   sender: "user",
      //   senderName: "Navin Lamsal",
      //   via: "email",
      //   timeStamp: Date.now(),
      //   subject: res.data.data.subject,
      //   body: res.data.data.message,
      // };
      // onFinish({ newmessage });
      if (editorRef.current) {
        editorRef.current.setData("");
      }
      setMessages("");
      setSubject("");
      onClose();
    } catch (err) {
      message.error("error sending message");
    }
  };
  const sendsms = async (data) => {
    try {
      const res = await axiosInstance.post(`${baseURL}sms/send/sms/`, data);
      message.success("message sent");
      const newmessage = {
        sender: "user",
        senderName: "Navin Lamsal",
        via: "phone_number",
        timeStamp: Date.now(),
        body: res.data.data.message,
      };
      onFinish({ newmessage });
      setsms("");
      onClose();
    } catch (err) {
      message.error("error sending message");
    }
  };

  const handleSend = async () => {
    if (network.email || network.phone) {
      if (sendMethod === "email") {
        if (subject !== "" && messages !== "") {
          const data = {
            subject: subject,
            message: messages,
            message_type:"Email"
            // recipients: [network.email],
          };
          await sendmessage(data);
        } else {
          message.warning("Invalid email or subject");
        }
      } else {
        if (sms !== "") {
          const data = {
            message: sms,
            recipients: [network.phone],
            message_type:"SMS"
          };
          await sendsms(data);
        } else {
          message.warning("Invalid sms");
        }
      }
    } else {
      message.error("Receipent list seems to be empty");
    }
  };

  return (
    <div className="">
      <div className="d-flex align-items-center gap-2 my-3">
        <label className="text-dynamic-white">Send Your message via </label>
        <Form.Select
          as="select"
          value={sendMethod}
          onChange={(e) => setSendMethod(e.target.value)}
          style={{ width: "10rem", marginRight: "4px" }}
          required
        >
          <option
            value={"email"}
            style={{ backgroundColor: "white", color: "black", padding: "4px" }}
          >
            Email
          </option>
          <option
            value={"phone"}
            style={{ backgroundColor: "white", color: "black", padding: "4px" }}
          >
            Phone Number
          </option>
        </Form.Select>
      </div>
      {sendMethod === "email" && (
        <>
          <Form.Group controlId="Subject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mb-3 text-dynamic-white"
              required
            />
            {/* {confirmPinError && <p className="text-danger">{confirmPinError}</p>} */}
          </Form.Group>

          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "link",
                // "ImageUpload",
              ],
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph",
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1",
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2",
                  },
                  {
                    model: "heading3",
                    view: "h3",
                    title: "Heading 3",
                    class: "ck-heading_heading3",
                  },
                ],
              },
            }}
            data=""
            placeholder="Enter you message..."
            onReady={handleEditorReady}
            onChange={(event, editor) => {
              const data = editor.getData(); // Get the updated content from the editor
              setMessages(data); // Update the content state variable
            }}
            onError={(error) => {
              console.error("Error initializing editor:", error);
            }}
          />
        </>
      )}
      {sendMethod === "phone" && (
        <>
          <Form.Group controlId="Subject">
            <Form.Label>SMS</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={sms}
              onChange={handleSMSChange}
              className="mb-3 text-dynamic-white"
              required
            />
            <div className="text-muted">
              {maxChars - subject.length} characters remaining
            </div>
          </Form.Group>
        </>
      )}

      {/* )} */}
      <div className="d-flex  mt-4 mb-2 gap-2 flex-1">
        <Button variant="secondary" onClick={(e) => setIsCancel(true)}>
          Cancel
        </Button>
        <Button onClick={handleSend}>Send Message</Button>
      </div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={isCancel}
        onHide={() => setIsCancel(false)}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Alert
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="facebook-post-creation">
            <h3>Are You sure You want to cancel?</h3>
            <p className="text-warning">Form will be reset</p>
          </div>
          <div className="d-flex justify-content-end">
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setIsCancel(false)}
                className="mt-4 "
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCancel}
                className="mt-4 "
              >
                Confirm
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeadMessageContent;
