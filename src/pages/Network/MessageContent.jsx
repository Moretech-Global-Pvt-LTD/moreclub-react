import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { message } from "antd";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const MessageContent = () => {
  const networkList = useSelector((state) => state.networkReducer);
  const [sendMethod, setSendMethod] = useState("email");
  const [messages, setMessages] = useState("");
  const [subject, setSubject] = useState("");
  const editorRef = useRef(null);

  const handleEditorReady = (editor) => {
    editorRef.current = editor;
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      // Reset the message content if user confirms
      setMessages("");
      if (editorRef.current) {
        editorRef.current.setData("");
      }
    }
  };

  // const handleSelect =(value)=>{
  //   setSendMethod(value);
  //   if(value !== ""){
  //     setReceipentList([])
  //   }else if(value === "email"){
  //     setReceipentList(networkList.emailList)
  //   }else if(value === "phone"){
  //     setReceipentList(networkList.phoneList)
  //   }else{
  //     setReceipentList([])
  //   }
  // }
  const sendmessage = async (data) => {
    try {
      const res = await axiosInstance.post(`${baseURL}sms/send/email/`, data);
      console.log(res);
      message.success("message sent");
    } catch (err) {
      message.error("error sending message");
    }
  };

  const handleSend = async () => {
    if (networkList.emailList || networkList.phoneList) {
      if (sendMethod === "email") {
        console.log("email list", networkList.emailList);

       
        const data = {
          subject: subject,
          message: messages,
          recipients: networkList.emailList,
        };
        await sendmessage(data);
      } else {
        console.log("phone list", networkList.phoneList);
        console.log("message", messages);
      }
    } else {
      message.error("Receipent list seems to be empty");
    }
  };

  return (
    <div className="card p-2">
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
          {/* <option
            value={"phone"}
            style={{ backgroundColor: "white", color: "black", padding: "4px" }}
          >
            Phone Number
          </option> */}
        </Form.Select>
      </div>

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

      {/* {error && <p>Error loading editor: {error}</p>}
      {!showEditor && !error && <p>Loading ....</p>}
      {showEditor && !error && ( */}
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
            "ImageUpload",
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

      {/* )} */}
      <div className="d-flex  mt-4 mb-2 gap-2 flex-1">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSend}>Send Message</Button>
      </div>
    </div>
  );
};

export default MessageContent;
