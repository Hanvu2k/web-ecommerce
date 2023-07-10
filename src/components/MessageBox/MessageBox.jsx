import React from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../css/messageBox.scss"; // Importing the messageBox styling
import { messageActions } from "../../store/message"; // Importing the messageActions from the message store
import { ReactComponent as Send } from "../../assets/icon/🦆 icon _send_.svg";
import { ReactComponent as Message } from "../../assets/icon/Messages.svg";

function MessageBox() {
    // Getting the show/hide status
    const isShow = useSelector((state) => state.message.isShow);
    const dispatch = useDispatch();

    // Dispatching the toggleShowMessageUp action to show or hide the message box
    const toggleMessageHandle = () => {
        dispatch(messageActions.toggleShowMessageUp());
    };

    return (
        <div className="messageBox-wrapper d-flex align-items-end">
            {isShow && (
                <div className="chat-box mr-2">
                    <div className="chat-title d-flex justify-content-between">
                        <div>Customer Support</div>
                        <div>Let's Chat App</div>
                    </div>
                    <div className="chat-messages my-4">
                        <div className="message-left">
                            <span className="content">
                                Hello! How can I assist you?
                            </span>
                        </div>
                        <div className="message-right">
                            <span className="content">
                                Hi! I have a question about your products.
                            </span>
                        </div>
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Type your message here..."
                        />
                        <button className="send-button">
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
