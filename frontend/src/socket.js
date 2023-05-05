import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Replace with your server URL

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

export default socket;