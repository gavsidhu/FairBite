const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sessionRoutes = require("./routes/session");
const userRoutes = require("./routes/user");
const app = express();
const dotenv = require("dotenv");
const restaurantRoutes = require("./routes/restaurant");
const Session = require("./database/models/session");
const server = require("http").createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'https://sesl-1-level-4-team-6.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(
  cors({
    origin: "https://sesl-1-level-4-team-6.vercel.app",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Food Bites" });
});

app.use("/session", sessionRoutes);
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);

const PORT = process.env.PORT || 8000;
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for a new user joining the session
  socket.on("join-session", async (sessionId, userId) => {
    try {
      // Find the session in the database
      const session = await Session.findById(sessionId);

      if (!session) {
        console.log("Session not found:", sessionId);
        socket.emit("error", "Session not found");
        return;
      }

       // Check if the session is already expired
    if (session.expired) {
      console.log("Session expired:", sessionId);
      socket.emit("session-expired", sessionId);
      return;
    }

      // Find the user in the session
      const user = session.users.find((user) => user._id === userId);

      // Update the user's joined status if not already true
      if (user && !user.joined) {
        user.joined = true;
        await session.save();

        // Notify other users that a new user has joined
        socket.broadcast.emit("user-joined", sessionId, userId);
      }

      // Check if all users have joined the session
      const allUsersJoined = session.users.every((user) => user.joined);

      if (allUsersJoined) {
        // Emit an event to notify all clients that all users have joined
        io.emit("all-users-joined", sessionId);
      }
    } catch (error) {
      console.error("Error while joining the session:", error);
      socket.emit("error", "Error while joining the session");
    }
  });

  // Listen for the "like-restaurant" event
socket.on("like-restaurant", async (sessionId, userId, restaurantId) => {
  try {
    // Find the session in the database
    const session = await Session.findById(sessionId);

    if (!session) {
      console.log("Session not found:", sessionId);
      socket.emit("error", "Session not found");
      return;
    }

    // Update the session data with the liked restaurant
    const likedRestaurant = session.likedRestaurants.find(
      (restaurant) => restaurant.restaurantId === restaurantId
    );

    if (likedRestaurant) {
      if (!likedRestaurant.users.includes(userId)) {
        likedRestaurant.users.push(userId);
      }
    } else {
      session.likedRestaurants.push({
        restaurantId: restaurantId,
        users: [userId],
      });
    }

    // Save the updated session data
    await session.save();

    // Emit an event to broadcast the updated session data to all connected clients
    io.emit("session-data-updated", sessionId, session);
  } catch (error) {
    console.error("Error while updating session data:", error);
    socket.emit("error", "Error while updating session data");
  }
});
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
