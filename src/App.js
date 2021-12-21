import './App.css';
import { useState } from 'react';
import Chat from './components/Chat';
import { socket } from './socketIO';
import Login from './components/Login';
import { Col, Container, Row } from 'react-bootstrap';

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (
    <Container>
      <Row className="row">
        <Col>
        <div className="App">
          {!showChat ? (
            <Login
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              setShowChat={setShowChat}
            />
          ) : (
            <Chat
              socket={socket}
              username={username}
              room={room}
            />
          )}
        </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
