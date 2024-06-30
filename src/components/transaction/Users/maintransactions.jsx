import React, { useEffect } from "react";
import TransactionCard from "../../cards/transactioncard";
import { get_transaction } from "../../../redux/api/transactionAPI";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const MainTransactions = () => {
  const transaction = useSelector((state) => state.transactionReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(get_transaction());
  }, [dispatch]);

  return (
    <div className="content-inside-wrapper">
      <Table responsive className="bg-white">
        <thead className="border-bottom-0">
          <tr>
            {/* <th>
              <input type="checkbox" onChange={handleSelectAll} />
            </th> */}
            <th className="text-dynamic-white"> Name</th>
            <th className="text-dynamic-white">Email</th>
            <th className="text-dynamic-white">Phone</th>
            {/* {permissions && permissions.send_sms_refer && (
              <th className="text-dynamic-white text-center">Actions</th>
            )} */}
          </tr>
        </thead>
        <tbody>
          <>
            {transaction.transaction &&
              transaction.transaction.map((row) => {
                // {data &&
                //   data.map((row) => (
                <tr key={row.user.username} className="text-dynamic-white">
                  {/* <td>
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, row)}
                      checked={selectedRows.includes(row)}
                    />
                  </td> */}
                  <td className="text-dynamic-white">
                  <span>{row.created_at}</span>
                  <span>to: {row.business_profile.business_name}</span>
                  <span>from:{row.business_profile.business_name}</span>
                  </td>
                  <td className="text-dynamic-white">{row.paid_amount}</td>
                  <td className="text-dynamic-white">
                    {" "}
                    {row.total_amount}
                  </td>
                  {/* {permissions && permissions.send_sms_refer && (
                    <td className="text-dynamic-white text-center">
                      <i className="bi bi-envelope"></i>
                    </td>
                  )} */}
                </tr>;
              })}
          </>
          <>
            {!transaction.transaction && (
              <tr>
                <td colSpan={4} className="p-3 ">
                  <div className="d-flex justify-content-center text-dynamic-white">
                    No referals Found
                  </div>
                </td>
              </tr>
            )}
          </>
          {/* <>
            {meta && meta?.count === 0 && (
              <tr>
                <td colSpan={4} className="p-3 ">
                  <div className="d-flex justify-content-center text-dynamic-white">
                    No referals Found
                  </div>
                </td>
              </tr>
            )}
          </> */}
        </tbody>
        {/* <tfoot>
          <tr>
            <td colSpan={4} className="p-1 ">
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
        </tfoot> */}
      </Table>

      {transaction.transaction &&
        transaction.transaction.map((trans) => {
          return (
            <TransactionCard
              icon={"bi-receipt"}
              name={trans.business_profile.business_name}
              date={trans.created_at}
              balance={trans.total_amount}
              amount={trans.paid_amount}
              key={trans.id}
            />
          );
        })}
      {transaction.transaction && (
        <h6 className="m-auto pb-4 text-center">No transaction Found</h6>
      )}
    </div>
  );
};

export default MainTransactions;
