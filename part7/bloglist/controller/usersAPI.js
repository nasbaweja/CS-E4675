const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const UserModel = require("../model/users");

usersRouter.get("/", async (request, response) => {
  const users = await UserModel.find({}).populate("blogs", {
    url: 1,
    title: 1,
  });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;
  const rounds = 10;
  const passwordHash = await bcrypt.hash(body.password, rounds);

  const user = new UserModel({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser.toJSON());
});

module.exports = usersRouter;
