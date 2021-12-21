import socketIoClient from 'socket.io-client';


export const socket = socketIoClient("http://localhost:3001", { transports: ['websocket'] });