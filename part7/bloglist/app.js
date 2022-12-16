const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const blogsRouter = require("./controller/blogAPI");
const usersRouter = require("./controller/usersAPI");
const loginRouter = require("./controller/loginAPI");
const testingRouter = require("./controller/testingAPI");
const config = require("./utils/config");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((e) => console.log(`Error occured ${e}`));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
// app.use(middleware.userExtractor)
app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/testing/reset", testingRouter);
app.use(middleware.endpointUnknown);
app.use(middleware.handleErrors);

module.exports = app;
