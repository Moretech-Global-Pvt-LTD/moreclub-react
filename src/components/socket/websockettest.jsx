import React, { useState, useEffect, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { baseURL } from '../../config/config';

const WebsocketTest = () => {
    const [message, setMessage] = useState('');
    const [wsStatus, setWsStatus] = useState('Disconnected');
    const wsRef = useRef(null);

    useEffect(() => {
        const token = sessionStorage.getItem("moretechglobal_access");

        if (token) {
            // Initialize the WebSocket only if the token exists
            wsRef.current = new ReconnectingWebSocket(`ws://${baseURL}/ws/ride/`);
            setWsStatus('Connecting...');

            wsRef.current.onopen = () => {
                console.log("WebSocket connected");
                setWsStatus('Connected');
            };

            wsRef.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                console.log("Received message:", data);
                // Handle the received message data
            };

            wsRef.current.onclose = (event) => {
                console.log("WebSocket closed", event);
                setWsStatus('Disconnected');
            };

            wsRef.current.onerror = (error) => {
                console.error("WebSocket encountered error: ", error);
                setWsStatus('Error');
            };
        }

        // Clean up the WebSocket connection when the component unmounts
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                console.log("WebSocket closed on component unmount");
            }
        };
    }, []);

    const sendMessage = () => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const messageToSend = JSON.stringify({ message });
            wsRef.current.send(messageToSend);
            console.log("Sent message:", messageToSend);
        } else {
            console.log("Cannot send message, WebSocket is not open");
        }
    };

    return (
        <div>
            <h2>WebSocket Status: {wsStatus}</h2>

            <input
                type='text'
                placeholder="Enter Message"
                className='form-control'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button
                className='btn btn-primary'
                onClick={sendMessage}
                disabled={wsStatus !== 'Connected'}
            >
                Send Message
            </button>
        </div>
    );
};

export default WebsocketTest;
