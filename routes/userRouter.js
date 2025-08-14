// external modules
const express = require("express");

// internal controllers
const {
  loginController,
  signupController,
  verifyController,
  logoutController,
} = require("../controllers/authController");

// add Property Controller
const {
  addPropertyController,
} = require("../controllers/userControllers/addPropertyController");

// get property list controller
const getPropertiesController = require("../controllers/userControllers/getPropertiesController");
// add room controller
const {
  addRoomController,
} = require("../controllers/userControllers/addRoomController");

// assign room controller
const {
  assignRoomController,
} = require("../controllers/userControllers/assignRoomController");

// check user
const authUser = require("../middlewares/authUser");

const {
  dashboardController,
} = require("../controllers/userControllers/dashBoardController");
const {
  addTenantController,
} = require("../controllers/userControllers/addTenantController");

const {
  getTenantsController,
} = require("../controllers/userControllers/getTenantsController");

const {
  getRoomsController,
} = require("../controllers/userControllers/getRoomsController");

const {
  updateRoomStatusController,
} = require("../controllers/userControllers/updateRoomStatusController");

////// init router
const userRouter = express.Router();

// user dashboard
userRouter.get("/", dashboardController);
// login request
userRouter.post("/login", loginController);
// signup request
userRouter.post("/signup", signupController);
// logout request
userRouter.post("/logout", logoutController);
// verify token
userRouter.get("/verify_user", authUser, verifyController);

// add property request
userRouter.post("/add_property", authUser, addPropertyController);

// get property list
userRouter.get("/get_properties", authUser, getPropertiesController);

// add room request
userRouter.post("/add_room", authUser, addRoomController);

// add tenant request
userRouter.post("/add_tenant", authUser, addTenantController);
// get tenant list
userRouter.get("/get_tenants", authUser, getTenantsController);

// assign room request

userRouter.post("/assign_room", authUser, assignRoomController);

// get rooms list
userRouter.post("/get_rooms", authUser, getRoomsController);
// update room availability
userRouter.post("/update_room_status", authUser, updateRoomStatusController);

module.exports = userRouter;
