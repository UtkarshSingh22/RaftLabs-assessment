const express = require("express");
const { connectToDatabase } = require("./database");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/errorHandlers");
require("dotenv").config();

const app = express();

// Connect to the database (MongoDB)
connectToDatabase();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Available routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Web sockets
const io = require("./socket").init(server);
io.on("connection", (socket) => {
    console.log("Client connected");
});
