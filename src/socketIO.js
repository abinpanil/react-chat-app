import socketIoClient from 'socket.io-client';


export const socket = socketIoClient("https://react-chat-app-chatify.herokuapp.com", { transports: ['websocket'] });