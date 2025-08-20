// external modules
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// database connection
const pool = require("../utils/db");

// login controller

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const [users] = await pool.query("SELECT * FROM users WHERE email = ? ", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ message: "Email Doesn't Exist" });
    }

    // storing query in a variable
    const user = users[0];

    // passwored check
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Passwords Do Not Match" });
    }

    // getting user id from stored query result
    const userId = user.user_id;

    // create json webtoken

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // passcheck passed and logged in
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Logged In Successfully",
        token,
        user: {
          user_id: user.user_id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
        },
        status: true,
      });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

// signupcontroller
exports.signupController = async (req, res) => {
  console.log(req.url);
  const { email, password, firstname, lastname, phone } = req.body;

  try {
    // check if email exists and return
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Email Already Exists" });
    }

    // email is new amd ready to send to db

    const hashedPassword = await bcrypt.hash(password, 12);

    // insert new user

    await pool.query(
      "INSERT INTO users(firstname,lastname,email,password_hash,phone) VALUES(?,?,?,?,?)",
      [firstname, lastname, email, hashedPassword, phone]
    );

    res
      .status(201)
      .json({ message: "User Registered Successfully", status: true });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// logoutController
exports.logoutController = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    })
    .status(200)
    .json({ message: "Logged Out Successfully", status: true });
};

exports.verifyController = async (req, res) => {
  const [users] = await pool.query("SELECT * FROM users WHERE user_id = ? ", [
    req.user.id,
  ]);

  if (users.length === 0) {
    return res.status(401).json({ message: "Token Error. Login Again" });
  }
  const user = users[0];
  res.status(200).json({
    message: "Authorized",
    user: {
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    },
    status: true,
  });
};
