const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const chatRoutes =
require("./routes/chatRoutes");

const conversationRoutes =
require(
  "./routes/conversationRoutes"
);

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use("/api/auth",authRoutes);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/conversations",
  conversationRoutes
);

app.listen(process.env.PORT,()=>{

 console.log(
  `Server running on ${process.env.PORT}`
 );

});