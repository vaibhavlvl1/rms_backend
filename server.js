// external modules
const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
const cookieParser = require("cookie-parser");

// internal modules
const userRouter = require("./routes/userRouter");

const app = express();

// using cors options
app.use(cors(corsOptions));

// for parsing sent inputs
app.use(express.urlencoded({ extended: true }));
// for parsing json
app.use(express.json());
// for sending and receiving token in cookies
app.use(cookieParser());

// routes
app.use("/user", userRouter);

// 404 page
app.use((req, res) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});

// live server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
