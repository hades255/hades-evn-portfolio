const User = require("../models/user");

// function generateAccessToken(data) {
//   return jwt.sign(data, "process.env.TOKEN_SECRET", { expiresIn: "1s" });
// }

const login = (req, res, next) => {
  res.render("auth/login");
};

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne("email", "montgasam@gmail.com");
    console.log(user);
    if (!user.authenticate(req.body.password)) {
      return res.status("401").send({
        error: "Password don't match.",
      });
    }
    const token = user.generateAccessToken();
    res.json(token);
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    await User.create(req.body);
    res.send("OK");
  } catch (error) {
    next(error);
  }
};

module.exports = { login, signin, signup };
