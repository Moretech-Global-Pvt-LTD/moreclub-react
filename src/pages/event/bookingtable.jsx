import React, { useState, createContext } from "react";
import { Table, Button, } from "react-bootstrap";
import * as XLSX from "xlsx";

import { useDispatch } from "react-redux";
import { updateSelctionData } from "../../redux/slices/NetworkListSlice";
import MembershipCodeReader from "../../components/QR/membershipcodeScanner";
import { Modal, Space } from "antd";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const BookingTable = ({ list, eventId }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [membership, setMembership] = useState("");
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();

  // const { data: bookings, isLoading, isError } = useQuery({
  //   queryKey: ["booking list", username],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(`${baseURL}permissions/list/`);
  //     return response.data.data;
  //   },
  //   staleTime: 1000,
  // });

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

  const success = () => {
    Modal.success({
      title: "Welcome, You have your booking",
      content: (
        <div>
          <Button variant="sucess" className="align-self-center">
            Entry
          </Button>
        </div>
      ),
      onOk() {},
    });
  };

  const error = () => {
    Modal.error({
      title: "You have not booked",
      content: <div></div>,
      onOk() {},
    });
  };

  const ScannerResult = async (result) => {
    const resultObject = JSON.parse(result.data);
    if (resultObject.username) {
      const membershipCode = resultObject.username;
      setMembership(membershipCode);
      try {
        const res = await axiosInstance.get(
          `${baseURL}events/book/check/?event_id=${eventId}&&username=${membershipCode}`
        );
        success();
      } catch (err) {
        error();
      }
    } else {
      setMembership("");
    }
  };

  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);

  const config = {
    title: "Scan the MemberCode",
    content: (
      <div style={{ width: "300px", height: "300px", position: "relative" }}>
        <MembershipCodeReader onScansSuccess={ScannerResult} />
      </div>
    ),
  };

  return (
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
        <div className="d-flex gap-2">
        <ReachableContext.Provider value="Light">
          <Space>
            <Button
              onClick={async () => {
                modal.info(config);
              }}
              className="btn-sm"
            >
              <i class="bi bi-qr-code-scan"></i>
            </Button>
          </Space>
          {/* `contextHolder` should always be placed under the context you want to access */}
          {contextHolder}

          {/* Can not access this context since `contextHolder` is not in it */}
          <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>

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
    
    </div>
  );
};

export default BookingTable;
