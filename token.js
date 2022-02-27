const jwt = require("jsonwebtoken");
const secret = "Feedledee";

const create = (user) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, secret, {});
};

const verify = (req, res, next) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, secret, (err) => {
      return err ? res.send(err) : next();
    });
  } else {
    return res.send({ auth: "failed" });
  }
};

const decode = (token) => {
  if (token) {
    token = token.slice(7, token.length);
    return jwt.verify(token, secret, (err) => {
      return err ? null : jwt.decode(token, { complete: true }).payload;
    });
  } else {
    return null;
  }
};

module.exports = { create, verify, decode };
