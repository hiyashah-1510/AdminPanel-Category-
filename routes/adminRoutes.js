const express = require("express");
const router = express.Router();

const passport = require("passport");

const adminController = require("../controllers/adminController");

const {
  checkAuthentication,
  checkLogin
} = require("../middleware/authMiddleware");

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "public/assets/uploads");

  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});

const upload = multer({ storage });

router.get(
  "/",
  checkAuthentication,
  adminController.dashboard
);

router.get(
  "/login",
  checkLogin,
  adminController.loginPage
);

router.post(
  "/login",

  passport.authenticate("local", {

    failureRedirect: "/admin/login",
    failureFlash: true

  }),

  (req, res) => {

    req.flash("success", "Login Successfully");

    res.redirect("/admin");

  }

);

router.get(
  "/register",
  adminController.registerPage
);

router.post(
  "/register",
  upload.single("avatar"),
  adminController.registerAdmin
);

router.get(
  "/logout",
  adminController.logout
);

router.get(
  "/add",
  checkAuthentication,
  adminController.addPage
);

router.post(
  "/add",
  checkAuthentication,
  upload.single("avatar"),
  adminController.addAdmin
);

router.get(
  "/view",
  checkAuthentication,
  adminController.viewAdmins
);

router.get(
  "/delete/:id",
  checkAuthentication,
  adminController.deleteAdmin
);

router.get(
  "/edit/:id",
  checkAuthentication,
  adminController.editPage
);

router.post(
  "/update/:id",
  checkAuthentication,
  upload.single("avatar"),
  adminController.updateAdmin
);

router.get(
  "/change-password/:id",
  checkAuthentication,
  adminController.changePasswordPage
);

router.post(
  "/update-password/:id",
  checkAuthentication,
  adminController.updatePassword
);

router.get(
  "/profile",
  checkAuthentication,
  adminController.profilePage
);

router.post(
  "/update/:id",
  checkAuthentication,
  upload.single("avatar"),
  adminController.updateProfile
);

router.get("/forgot-password", adminController.forgotPasswordPage);

router.post("/send-otp", adminController.sendOTP);

router.get("/verify-otp", adminController.verifyOtpPage);

router.post("/verify-otp", adminController.verifyOTP);

router.get("/reset-password", adminController.resetPasswordPage);

router.post("/reset-password", adminController.resetPassword);

module.exports = router;