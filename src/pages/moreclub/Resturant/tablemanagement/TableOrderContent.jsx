import React, { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { getwsApiUrl } from "../../../../utills/utility";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTable,
  updateTableWS,
} from "../../../../redux/slices/tableSlice";
import OrderSection from "../../../../components/Moreclub/Resturant/tablemanagement/OrderSection";

const TableOrderContent = () => {
  const { res_id, slug } = useParams();
  const sections = useSelector((state) => state.table.sections);
  const dispatch = useDispatch();

  const baseUrl = useMemo(() => getwsApiUrl(), []);
  const wsRef = useRef(null);
  const audioRef = useRef(new Audio("/audio/notification.mp3"));

  // WebSocket Setup
  useEffect(() => {
    wsRef.current = new ReconnectingWebSocket(
      `ws://192.168.1.72:8000/ws/restaurant/${slug}/tables/notifications/`

      // `wss://${baseUrl}/ws/restaurant/${slug}/tables/notifications/`
    );

    wsRef.current.onopen = (event) => console.log("WebSocket Connected");
    wsRef.current.onclose = () => console.log("WebSocket Disconnected");
    wsRef.current.onerror = (error) => console.error("WebSocket Error", error);

    wsRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      const { table_id, status, message: messages, action } = data;

      console.log("reeived",data);
      if ( action === "remove_table") {
        
       await dispatch(updateTableWS({
          table: {
            id: parseInt(table_id),
            billed_called: false,
            called: false,
            ordered: false,
            waiter_called: false,
            messages,
          },
        }));
      }else{
        await dispatch(
          updateTableWS({
            table: {
              id: parseInt(table_id),
              ...status,
              messages,
            },
          })
        );

      }
    };

    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [dispatch, res_id]);

  // Handle adding a new section

  // Handle table status change
  const handleStatusChange = (id) => {
    dispatch(
      updateTable({
        sectionId: res_id, // Replace with actual section ID if available
        table: {
          id,

          new_ordered: false,
          ordered: false,
          billed_called: false,
          called: false,
          waiter_called: false,
        },
      })
    );
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/notification.mp3" preload="auto" />
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2>Table Orders</h2>
        </div>
        <div>
          {sections.length > 0 ? (
            sections.map((section) => (
              <OrderSection
                key={section.id}
                section={section}
                onChangeStatus={handleStatusChange}
              />
            ))
          ) : (
            <div className="text-center w-100 text-dynamic-white">
              You have not set tables in your restaurant.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TableOrderContent;
