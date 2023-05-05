const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sessionRoutes = require("./routes/session");
const userRoutes = require("./routes/user");
const app = express();
const dotenv = require("dotenv");
const restaurantRoutes = require("./routes/restaurant");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Food Bites" });
});

app.use("/session", sessionRoutes);
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);

const PORT = process.env.PORT || 8000;
const server = require("http").createServer(app);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
