import React, { useState, createContext } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import * as XLSX from "xlsx";

import { useDispatch } from "react-redux";
import { updateSelctionData } from "../../redux/slices/NetworkListSlice";
import MembershipCodeReader from "../../components/QR/membershipcodeScanner";
import { Result, Space } from "antd";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const BookingTable = ({ list, eventId }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [membership, setMembership] = useState("");
  const dispatch = useDispatch();
  // const [modal, contextHolder] = Modal.useModal();
  const [scannerModal, setScannerModal] = useState(false);
  const [scannerResult, setScannerResult] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (e, rowData) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, rowData]);
      dispatch(updateSelctionData([...selectedRows, rowData]));
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== rowData));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(list);
      dispatch(updateSelctionData(list));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDownloadCSV = () => {
    setLoading(true);
    const selectedData = selectedRows.map((row) => [
      row.user.first_name + " " + row.user.last_name,
      row.user.email,
      row.user.phone_number,
    ]);
    const ws = XLSX.utils.aoa_to_sheet([
      ["Name", "Email", "Phone"],
      ...selectedData,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SelectedData");
    XLSX.writeFile(wb, "network_list.xlsx");
    setLoading(false);
  };

  // const handleSearching = async (e) => {
  //   e.preventDefault();
  //   console.log("searching");
  // };

  // const handleClearfilter = async (e) => {
  //   e.preventDefault();
  //   console.log("searching");
  // };

  
 

  const ScannerResult = async (result) => {
    const resultObject = JSON.parse(result.data);
    if (resultObject.username) {
      const membershipCode = resultObject.username;
      setMembership(membershipCode);
      try {
        const res = await axiosInstance.get(
          `${baseURL}events/book/check/?event_id=${eventId}&&username=${membershipCode}`
        );
        setMessage('Welcome! You have your booking Confirmed' )
      } catch (err) {
        setMessage('Sorry Your booking was not found')
      }finally{
        handleScannerClose();
        handleResultShow();
      }
    } else {
      setMembership("");
    }
  };

  const handleScannerClose = () => {
    setScannerModal(false);
  };

  const handleScannerShow = () => {
    setScannerModal(true);
  };

  const handleResultClose = () => {
    setScannerResult(false);
  };

  const handleResultShow = () => {
    setScannerResult(true);
  };


  return (
    <>
    <div>
      <div className="table-controls d-flex align-items-center justify-content-between mb-3 gap-2">
        {/* <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="primary"
                className="btm-sm"
                onClick={handleSearching}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Button
                variant="warning"
                className="btm-sm"
                onClick={handleClearfilter}
              >
                clear
              </Button>
            </Col>
          </Row>
        </Form> */}
        <h4>View your Bookings for the events</h4>
        <div className="d-flex gap-2 align-items-center">
          <Button onClick={handleScannerShow} className="btn-sm">
            <i class="bi bi-qr-code-scan"></i>
          </Button>

          <div className="my-4">
            <Button
              onClick={handleDownloadCSV}
              disabled={selectedRows.length === 0 || loading}
              className="btn btn-secondary btn-sm"
            >
              <i className="bi bi-arrow-down-circle"></i>
            </Button>
            {/* )} */}
          </div>
        </div>
      </div>
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr>
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th className="text-dynamic-white">Name</th>
            <th className="text-dynamic-white">Username</th>
            <th className="text-dynamic-white">Email</th>
            <th className="text-dynamic-white">Phone</th>
          </tr>
        </thead>
        <tbody>
          {list &&
            list.map((row) => (
              <tr key={row.user.username} className="text-dynamic-white">
                <td>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, row)}
                    checked={selectedRows.includes(row)}
                  />
                </td>
                <td className="text-dynamic-white">
                  {row.user.first_name}&nbsp;{row.user.last_name}
                </td>
                <td className="text-dynamic-white">{row.user.username}</td>
                <td className="text-dynamic-white">{row.user.email}</td>
                <td className="text-dynamic-white">{row.user.phone_number}</td>
              </tr>
            ))}
          {!list && (
            <tr>
              <td colSpan={4} className="p-3">
                <div className="d-flex justify-content-center text-dynamic-white">
                  No referals Found
                </div>
              </td>
            </tr>
          )}
          {/* {meta && meta?.count === 0 && (
            <tr>
              <td colSpan={4} className="p-3">
                <div className="d-flex justify-content-center text-dynamic-white">
                  No referals Found
                </div>
              </td>
            </tr>
          )} */}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="p-1">
              <div className="d-flex justify-content-center">
                {/* {meta && (
                  <Pagination
                    totalItems={meta?.count}
                    totalPages={meta?.total_pages}
                    itemsPerPage={20}
                  />
                )} */}
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={scannerModal}
        onHide={handleScannerClose}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white"
          >
            Scan the MemberCode
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ width: "300px", height: "300px", position: "relative", justifyContent: "center", margin: "auto" }}
          >
            <MembershipCodeReader onScansSuccess={ScannerResult} />
          </div>
          <div className="d-flex justify-content-center">

          <Button
          size="sm"
          className="mx-auto mt-3 btn btn-warning "
            onClick={handleScannerClose}
          >Close</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="sm"
        centered
        show={scannerResult}
        onHide={handleResultClose}
      >
        <Modal.Header>
          <Modal.Title
            id="contained-modal-title-vcenter text-center"
            className="text-dynamic-white text-center  d-flex justify-content-center"
          >
            <h4 className="text-center">
            Booking Status
            </h4>
           
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center w-100">{message}</p>
          <div className="d-flex justify-content-center">
            {message === "You have not booked" ? (
             <Button
             size="sm"
             className="mx-auto mt-3 btn btn-danger "
               onClick={handleResultClose}
             >Close</Button>
            ):
            <Button
             size="sm"
             className="mx-auto mt-3 btn btn-success "
               onClick={handleResultClose}
             >Close</Button>
            }
          
          </div>
        </Modal.Body>
      </Modal>
    </>

    
  );
};

export default BookingTable;
