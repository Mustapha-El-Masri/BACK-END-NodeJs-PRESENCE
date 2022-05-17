const UserModel = require("../models/User_model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const RT_SECRET = process.env.RT_SECRET;
const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "05686b89030208",
    pass: "a7f9c287e997e8",
  },
});
let RefreshTokens = [];
// generate Accesstoken
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: "30m",
  });
};
//generate RefreshToken
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, RT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = {
  register: (req, res) => {
    const salt = bcrypt.genSalt(10);
    const hashpassword = bcrypt.hashSync(req.body.password, parseInt(salt));
    const user = new UserModel({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: hashpassword,
      isAdmin: req.body.isAdmin,
      email: req.body.email,
    });
    user.save(req.body, (err, item) => {
      if (err) {
        res
          .status(400)
          .json({ status: 400, message: "register failed", data: null });
        console.log(err);
      } else {
        transport.sendMail(
          {
            from: "myapp@gmail.com",
            to: item.email,
            cc: "@gmail.com",
            bcc: "@gmail.com",
            subject: "Welcome " + item.firstname,
            text: "bonjour mr ",
            html: `<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <meta http-equiv="x-ua-compatible" content="ie=edge">
                      <title>Welcome Email</title>
                    </head>
                    <body>
                      <h2>Hello ${item.firstname + " " + item.lastname}! </h2>
                      <p>We're glad to have you on board at ${item.email}. </p>
                      <p>We're glad to have you on board at it gate</p>
                    </body>
                    </html>`,
          },
          function (err, res) {
            if (err) {
              console.log(err);
            } else {
              console.log("email send successfully");
            }
          }
        );
        res
          .status(200)
          .json({ status: 200, message: "user created", data: item });
      }
    });
  },
  login: async (req, res) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(406).json("email not founded");
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(406).json("password incorrect");
      } else {
        const AccessToken = generateAccessToken(user);
        const RefreshToken = generateRefreshToken(user);
        RefreshTokens.push(RefreshToken);
        //const {password,_id,email,...others}= user._doc
        res.status(201).json({ user, token: AccessToken, RT: RefreshToken });
      }
    }
  },
  verifyRefreshToken: (req, res, next) => {
    const RefreshToken = req.body.token;
    if (!RefreshToken) return res.status(401).json("token not exist");
    if (!RefreshTokens.includes(RefreshToken))
      return res.status(403).json("RefreshToken not exist");
    jwt.verify(RefreshToken, RT_SECRET, (err, user) => {
      RefreshTokens = RefreshTokens.filter((token) => token !== RefreshToken);
      const newAcessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      RefreshTokens.push(newRefreshToken);
      res
        .status(200)
        .json({ token: newAcessToken, refreshtoken: newRefreshToken });
    });
  },
  logout: (req, res, next) => {
    const RefreshToken = req.body.token;
    RefreshTokens = RefreshTokens.filter((token) => token !== RefreshToken);
    res.status(201).json(" you are logged out");
  },
};
