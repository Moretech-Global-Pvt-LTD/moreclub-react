import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagination from "../../components/ui/pagination/pagination";
import * as XLSX from "xlsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelctionData } from "../../redux/slices/NetworkListSlice";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../components/loading/loading";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";
import { getInitials, truncateText } from "../../utills/utility";

const NetworkTable = ({ list, meta }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = useLocation();
  // const limit = new URLSearchParams(search).get("limit") || 20;
  // const offset = new URLSearchParams(search).get("offset") || 0;
  const [limit, setLimit] = useState(new URLSearchParams(search).get("limit") || 20);
  const [offset, setOffset] = useState(new URLSearchParams(search).get("offset") || 0);

  const {
    data: permissions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const response = await axiosInstance.get(`${baseURL}permissions/list/`);
      return response.data.data;
    },
    staleTime: 1000,
  });

  const handleCheckboxChange = (e, rowData) => {
    if (e.target.checked) {
      setSelectedRows([...selectedRows, rowData]);
      dispatch(updateSelctionData([...selectedRows, rowData]));
    } else {
      setSelectedRows(selectedRows.filter((row) => row !== rowData));
    }
  };

  const handlePagelimit = (e) => { 
    setLimit(e.target.value);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("limit", e.target.value);
    const newPath = `${location.pathname}?${searchParams.toString()}`;
    navigate(newPath, { replace: true });
  }
  const handlePageOffset = (e) => {
    setOffset(e.target.value);
    const searchParams = new URLSearchParams(location.search);
    if (e.target.value === "" || parseInt(e.target.value, 10) <= 0) {
      if (searchParams.has("offset")) {
        searchParams.delete("offset");
        const newPath = `${location.pathname}?${searchParams.toString()}`;
        setTimeout(() => {
          navigate(newPath, { replace: true });
        }, 2000);
      }
    } else {
      searchParams.set("offset", e.target.value);
      const newPath = `${location.pathname}?${searchParams.toString()}`;
      setTimeout(() => {
        navigate(newPath, { replace: true });
      }, 2000);
    }
  }

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

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error fetching permissions</div>;
  }



  return (
    <div>
      <div className="table-controls d-flex align-items-center justify-content-between mb-3 ">
        <div className="">
          <label htmlFor="rowsPerPage" className="me-3">
            Rows per page:
          </label>
          <select id="rowsPerPage" value={limit} onChange={handlePagelimit} className="form-select">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="rowsPerPage" className="me-3">
            Start from:
          </label>
          <input value={offset} onChange={handlePageOffset} type="number" className="form-control"/>
        </div> */}
        <div>
          {permissions && permissions.send_sms_refer && (
            <Link to="/network/message">
              <Button
                className="btn btn-secondary btn-sm me-3"
                disabled={selectedRows.length <= 1}
              >
                <i className="bi bi-envelope"></i>
              </Button>
            </Link>
          )}
          {permissions && permissions.download && (
            <Button
              onClick={handleDownloadCSV}
              disabled={selectedRows.length === 0 || loading}
              className="btn btn-secondary btn-sm"
            >
              <i className="bi bi-arrow-down-circle"></i>
            </Button>
          )}
        </div>
      </div>

      {list && list.length > 0 && (
      <div className="d-flex align-item-center gap-2">
        <input type="checkbox" onChange={handleSelectAll} />{" "}
        <p className="fw-bold text-dynamic-white">Select All</p>
      </div>)}
      <div className="network-container">
        {list && list.length > 0 ? (
          list.map((row) => (
            <div
              key={row.user.username}
              className={`network-card mb-3 ${
                selectedRows.includes(row) ? "network-card-selected" : ""
              }`}
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center">
                <div className="network-card-select me-2">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckboxChange(e, row)}
                    checked={selectedRows.includes(row)}
                  />
                </div>
                <div className="network-card-body d-flex align-items-center">
                  <div className="network-card-image ">
                    {row.user.profile_image ? (
                      <img
                        src={row.user.profile_image}
                        alt={`${row.user.first_name} ${row.user.last_name}`}
                        className="rounded-circle"
                      />
                    ) : (
                      <div className="network-card-initials rounded-circle bg-black p-2 ">
                        {getInitials(row.user.first_name, row.user.last_name)}
                      </div>
                    )}
                  </div>
                  <div className="network-card-info ms-3">
                    <h5 className="network-card-name mb-0">
                      {truncateText(
                        `${row.user.first_name} ${row.user.last_name}`,
                        26
                      )}
                    </h5>
                    <p className="network-card-email mb-1 ">
                      {truncateText(row.user.email, 23)}
                    </p>
                    <p className="network-card-phone mb-0">
                      {row.user.phone_number}
                    </p>
                  </div>
                  {/* {permissions && permissions.send_sms_refer && ( */}
                  <div className="text-dynamic-white text-center ms-2">
                    <Link to="/network/message">
                      <Button
                        className="btn btn-secondary btn-sm me-3"
                        disabled={
                          selectedRows.length > 1 || !selectedRows.includes(row)
                        }
                      >
                        <i className="bi bi-envelope"></i>
                      </Button>
                    </Link>
                  </div>
                {/* )} */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted py-3"> </div>
        )}
      </div>

      {meta && meta?.count === 0 && (
        <div className="text-center text-muted py-3"> No referals Found</div>
      )}

      {meta && (
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            totalItems={meta?.count}
            totalPages={meta?.total_pages}
            itemsPerPage={20}
          />
        </div>
      )}  


      {/* <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr className="pricingcard-premium">
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th className="text-white"> Name</th>
            <th className="text-white">Email</th>
            <th className="text-white">Phone</th>
            {permissions && permissions.send_sms_refer && (
              <th className="text-white text-center">Actions</th>
            )}
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
                <td className="text-dynamic-white">{row.user.email}</td>
                <td className="text-dynamic-white">{row.user.phone_number}</td>
                {permissions && permissions.send_sms_refer && (
                  <td className="text-dynamic-white text-center">
                    <Link to="/network/message">
                      <Button
                        className="btn btn-secondary btn-sm me-3"
                        disabled={
                          selectedRows.length > 1 || !selectedRows.includes(row)
                        }
                      >
                        <i className="bi bi-envelope"></i>
                      </Button>
                    </Link>
                  </td>
                )}
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
          {meta && meta?.count === 0 && (
            <tr>
              <td colSpan={4} className="p-3">
                <div className="d-flex justify-content-center text-dynamic-white">
                  No referals Found
                </div>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="p-1">
              <div className="d-flex justify-content-center">
                {meta && (
                  <Pagination
                    totalItems={meta?.count}
                    totalPages={meta?.total_pages}
                    itemsPerPage={20}
                  />
                )}
              </div>
            </td>
          </tr>
        </tfoot>
      </Table> */}
    </div>
  );
};

export default NetworkTable;
