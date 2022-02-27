const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = (params) => {
  const newUser = new User({
    email: params.email,
    password: bcrypt.hashSync(params.password, 10),
  });

  return newUser.save().then((_user, err) => (err ? false : true));
};

module.exports = { register };
