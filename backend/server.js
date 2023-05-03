const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sessionRoutes = require("./routes/session")
const app = express();
const dotenv = require("dotenv")

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Food Bites" });
});

app.use("/session", sessionRoutes)

const PORT = process.env.PORT || 8000;
const server = require("http").createServer(app);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}