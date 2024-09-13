// import React, { useState, useEffect } from "react";
// import { Table, Button } from "react-bootstrap";
// import Pagination from "../../components/ui/pagination/pagination";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { updateSelctionData } from "../../redux/slices/NetworkListSlice";
// import { axiosInstance } from "../..";
// import { baseURL } from "../../config/config";

// const NetworkTable = ({ data, meta }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();

//   const handleCheckboxChange = (e, rowData) => {
//     if (e.target.checked) {
//       setSelectedRows([...selectedRows, rowData]);
//       dispatch(updateSelctionData([...selectedRows, rowData]));
//     } else {
//       setSelectedRows(selectedRows.filter((row) => row !== rowData));
//     }
//   };

//   const [permissions, setPermissions] = useState(null);

//   useEffect(() => {
//     const fetchPermissions = async () => {
//       try {
//         const res = await axiosInstance.get(`${baseURL}permissions/list/`);
//         setPermissions(res.data.data);
//       } catch (err) {
//         console.error("error fetching permisions", err);
//       }
//     };

//     fetchPermissions();
//   }, []);

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(data);
//       dispatch(updateSelctionData(data));
//       console.log(selectedRows);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   // const handleSendMail = () => {
//   //   // Implement mail sending functionality using selectedRows
//   //   alert("Sending mail...");
//   // };

//   const handleDownloadCSV = () => {
//     setLoading(true);
//     const selectedData = selectedRows.map((row) => [
//       row.user.first_name + " " + row.user.last_name,
//       row.user.email,
//       row.user.phone_number,
//     ]);
//     const ws = XLSX.utils.aoa_to_sheet([
//       ["Name", "Email", "Phone"],
//       ...selectedData,
//     ]);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "SelectedData");
//     XLSX.writeFile(wb, "network_list.xlsx");
//     setLoading(false);
//   };

//   return (
//     <div>
//       <div className="table-controls d-flex align-items-center justify-content-between mb-3 ">
//         <div className="d-flex align-items-center">
//           <label htmlFor="rowsPerPage" className="me-3">
//             Rows per page:
//           </label>
//           <select id="rowsPerPage">
//             <option value="20">20</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//         </div>
//         <div>
//           {permissions && permissions.send_sms_refer && (
//             <Link to="/network/message">
//               <Button
//                 className="btn btn-secondary btn-sm me-3"
//                 disabled={selectedRows.length <= 1}
//               >
//                 <i class="bi bi-envelope"></i>
//               </Button>
//             </Link>
//           )}
//           {permissions && permissions.download && (
//             <Button
//               onClick={handleDownloadCSV}
//               disabled={selectedRows.length === 0 || loading}
//               className="btn btn-secondary btn-sm"
//             >
//               <i class="bi bi-arrow-down-circle"></i>
//             </Button>
//           )}
//         </div>
//       </div>
//       <Table responsive className="bg-white">
//         <thead className="border-bottom-0">
//           <tr>
//             <th>
//               <input type="checkbox" onChange={handleSelectAll} />
//             </th>
//             <th className="text-dynamic-white"> Name</th>
//             <th className="text-dynamic-white">Email</th>
//             <th className="text-dynamic-white">Phone</th>
//             {permissions && permissions.send_sms_refer && (
//               <th className="text-dynamic-white text-center">Actions</th>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           <>
//             {data &&
//               data.map((row) => (
//                 <tr key={row.user.username} className="text-dynamic-white">
//                   <td>
//                     <input
//                       type="checkbox"
//                       onChange={(e) => handleCheckboxChange(e, row)}
//                       checked={selectedRows.includes(row)}
//                     />
//                   </td>
//                   <td className="text-dynamic-white">
//                     {row.user.first_name}&nbsp;{row.user.last_name}
//                   </td>
//                   <td className="text-dynamic-white">{row.user.email}</td>
//                   <td className="text-dynamic-white">
//                     {" "}
//                     {row.user.phone_number}
//                   </td>
//                   {permissions && permissions.send_sms_refer && (
//                     <td className="text-dynamic-white text-center">
//                       <Link to="/network/message">
//                         <Button
//                           className="btn btn-secondary btn-sm me-3"
//                           disabled={selectedRows.length > 1 || !selectedRows.includes(row)}
//                         >
//                           <i class="bi bi-envelope"></i>
//                         </Button>
//                       </Link>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//           </>
//           <>
//             {!data && (
//               <tr>
//                 <td colSpan={4} className="p-3 ">
//                   <div className="d-flex justify-content-center text-dynamic-white">
//                     No referals Found
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </>
//           <>
//             {meta && meta?.count === 0 && (
//               <tr>
//                 <td colSpan={4} className="p-3 ">
//                   <div className="d-flex justify-content-center text-dynamic-white">
//                     No referals Found
//                   </div>
//                 </td>
//               </tr>
//             )}
//           </>
//         </tbody>
//         <tfoot>
//           <tr>
//             <td colSpan={4} className="p-1 ">
//               <div className="d-flex justify-content-center">
//                 {meta && (
//                   <Pagination
//                     totalItems={meta?.count}
//                     totalPages={meta?.total_pages}
//                     itemsPerPage={20}
//                   />
//                 )}
//               </div>
//             </td>
//           </tr>
//         </tfoot>
//       </Table>
//     </div>
//   );
// };

// export default NetworkTable;

import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import Pagination from "../../components/ui/pagination/pagination";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateSelctionData } from "../../redux/slices/NetworkListSlice";
import { useQuery } from "@tanstack/react-query";

import Loading from "../../components/loading/loading";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const NetworkTable = ({ list, meta }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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
        <div className="d-flex align-items-center">
          <label htmlFor="rowsPerPage" className="me-3">
            Rows per page:
          </label>
          <select id="rowsPerPage">
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
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
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr className="pricingcard-premium">
            <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th>
            <th className="text-dynamic-white"> Name</th>
            <th className="text-dynamic-white">Email</th>
            <th className="text-dynamic-white">Phone</th>
            {permissions && permissions.send_sms_refer && (
              <th className="text-dynamic-white text-center">Actions</th>
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
      </Table>
    </div>
  );
};

export default NetworkTable;
