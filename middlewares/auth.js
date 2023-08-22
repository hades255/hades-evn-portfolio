const jwt = require("jsonwebtoken");

const auth = (role) => (req, res, next) => {
  const token = req.cookies.token;
  if (token == null) return role === "login" ? next() : res.redirect("/");
  jwt.verify(token, "process.env.TOKEN_SECRET", (err, user) => {
    if (err)
      return role === "login" ? next() : res.redirect("/");
    req.user = user;
    if (role === "login") res.redirect("/admin");
    else next();
  });
};

const authJWT = (role) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "process.env.TOKEN_SECRET", (err, user) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

module.exports = { auth, authJWT };
