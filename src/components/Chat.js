import React, { useEffect, useState } from 'react';
import { IoSend, IoVideocamOutline } from "react-icons/io5";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState('');
    const [messageList, setMessageList] = useState([]);


    const sentMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-body">
            <div className="header">
                <h5>Chat <br /> <span>Room ID #{room}</span> </h5>

                <a><IoVideocamOutline /></a>
            </div>
            <div className="body">
                <ScrollToBottom className="message-container">
                    {messageList.map((message) => {
                        console.log(message);
                        return (
                            <div className="imessage">
                                <p className={username === message.author ? "from-me" : "from-them"}>{message.message}</p>
                                <div className={username === message.author ? "message-meta-me" : "message-meta-them"}>
                                    <span className="time" >{message.time}</span>
                                    <span className="author">{message.author}</span>
                                </div>

                            </div>

                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="footer">
                <input
                    placeholder="Type Message..."
                    value={currentMessage}
                    type="text"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sentMessage()}
                />
                <button onClick={sentMessage}><IoSend /></button>
            </div>
        </div>
    )
}

export default Chat
