import React from 'react'
import './Login.css'
import { socket } from '../socketIO'

function Login({username, setUsername, room, setRoom, setShowChat}) {

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room)
            setShowChat(true)
        } else {
            alert("fill all input")
        }
    }

    return (
        <div className="login-window">
            <h2>Join A Chat</h2>
            <input className="login-input"
                type="text"
                placeholder="name....."
                onChange={(e) => setUsername(e.target.value)}
            />
            <input className="login-input"
                type="text"
                placeholder="Room ID..."
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join</button>
        </div>
    )
}

export default Login
