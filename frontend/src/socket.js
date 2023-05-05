import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_BACKEND_URL); // Replace with your server URL

socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

export default socket;