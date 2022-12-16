const testingRouters = require("express").Router();
const UserModel = require("../model/users");
const Balrog = require("../model/blog");

testingRouters.post("/", async (request, response) => {
  await UserModel.remove({});
  // await Balrog.remove({})
  response.json({});
});

module.exports = testingRouters;
