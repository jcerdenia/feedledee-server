const User = require("../models/user");
const bcrypt = require("bcrypt");
const token = require("../token");

const register = (params) => {
  return User.find({ email: params.email }).then((result) => {
    if (!result.length) {
      const newUser = new User({
        email: params.email,
        password: bcrypt.hashSync(params.password, 10),
      });

      return newUser.save().then((_user, err) => (err ? false : true));
    } else {
      return { error: "User already exists." };
    }
  });
};

const auth = (params) => {
  return User.findOne({ email: params.email }).then((user) => {
    switch (true) {
      case !user: {
        return false;
      }
      case user && !bcrypt.compareSync(params.password, user.password): {
        return false;
      }
      default: {
        return { accessToken: token.create(user) };
      }
    }
  });
};

module.exports = { register, auth };
