import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DebounceInput } from "react-debounce-input";
import io from "socket.io-client";

import "../../css/messageBox.scss"; // Importing the messageBox styling
import { messageActions } from "../../store/messageSlice"; // Importing the messageActions from the message store
import { ReactComponent as Send } from "../../assets/icon/🦆 icon _send_.svg";
import { ReactComponent as Message } from "../../assets/icon/Messages.svg";
import apiConfig from "../../api/apiConfig";

const socket = io("http://localhost:5000");

function MessageBox() {
    // Getting the show/hide status
    const isShow = useSelector((state) => state.message.isShow);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user?.user);
    const chatMessagesRef = useRef(null);
    const { messages } = useSelector((state) => state.message);
    const [isShowMessage, setIsShowMessage] = useState(true);

    // Dispatching the toggleShowMessageUp action to show or hide the message box
    const toggleMessageHandle = () => {
        dispatch(messageActions.toggleShowMessageUp());
    };

    useEffect(() => {
        isShow === true && socket.emit("join_room", user?._id);
    }, [isShow, user?._id]);

    const [message, setMessage] = useState("");

    const sendMessage = async () => {
        if (message.trim() !== "" && message === "/end") {
            setIsShowMessage(false);
            setMessage("");
            dispatch(apiConfig.sendMessage(messages));
            return;
        }

        if (message.trim() !== "") {
            setIsShowMessage(true);
            const messageData = {
                room: user?._id,
                author: user?.fullName,
                message: message,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            dispatch(messageActions.getMessage(messageData));

            setMessage("");
        }
    };

    useEffect(() => {
        dispatch(apiConfig.getMessage());

        const receiveMessageListener = (data) => {
            dispatch(messageActions.getMessage(data));
        };

        socket.on("receive_message", receiveMessageListener);

        return () => {
            socket.off("receive_message", receiveMessageListener);
        };
    }, [dispatch]);

    useEffect(() => {
        // Scroll to the bottom of the chat messages container when new messages are added
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        // Scroll to the bottom when the message box is opened
        if (isShow && chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop =
                chatMessagesRef.current.scrollHeight;
        }
    }, [isShow]);

    return (
        <div className="messageBox-wrapper d-flex align-items-end">
            {isShow && (
                <div className="chat-box mr-2">
                    <div className="chat-title d-flex justify-content-between">
                        <div>Customer Support</div>
                        <div>Let's Chat App</div>
                    </div>
                    <div className="chat-messages my-4" ref={chatMessagesRef}>
                        <div className="message-left">
                            <span className="content">
                                Hello! How can I assist you?
                            </span>
                        </div>
                        {isShowMessage &&
                            messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={
                                        user?.fullName === msg.author
                                            ? "message-right"
                                            : "message-left"
                                    }
                                >
                                    <span className="content">
                                        {msg.message}
                                    </span>
                                    <span className="sub-message">
                                        {msg.time}
                                    </span>
                                </div>
                            ))}
                    </div>
                    <div className="input-box">
                        <DebounceInput
                            minLength={1}
                            debounceTimeout={500}
                            type="text"
                            className="chat-input"
                            placeholder="Type your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        />
                        <button onClick={sendMessage} className="send-button">
                            <Send />
                        </button>
                    </div>
                </div>
            )}
            <div onClick={toggleMessageHandle}>
                <Message />
            </div>
        </div>
    );
}

export default MessageBox;
