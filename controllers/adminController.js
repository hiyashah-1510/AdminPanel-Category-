const Admin = require("../models/adminSchema");
const bcrypt = require("bcrypt");
const transporter = require("../config/mailer");

exports.dashboard = (req, res) => {
  res.render("index");
};

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.registerPage = (req, res) => {
  res.render("register");
};

exports.registerAdmin = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {

      req.flash("error", "Email already registered");

      return res.redirect("back");

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({

      name,
      email,
      password: hashedPassword,
      role: "Admin",
      phone: "",

      avatar: req.file
        ? req.file.filename
        : ""

    });

    req.flash("success", "Registration Successful");

    res.redirect("/admin/login");

  } catch (err) {

    console.log(err);

    req.flash("error", "Registration Failed");

    res.redirect("back");

  }

};

exports.logout = (req, res) => {

  req.logout((err) => {

    if (err) {
      console.log(err);
    }

    req.flash("success", "Logout Successful");

    return res.redirect("/admin/login");

  });

};

exports.addPage = (req, res) => {
  res.render("addAdmin");
};

exports.addAdmin = async (req, res) => {

  try {

    if (!req.file) {

      req.flash("error", "Avatar required");

      return res.redirect("back");

    }

    const data = req.body;

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    data.password = hashedPassword;

    data.avatar = req.file.filename;

    await Admin.create(data);

    req.flash("success", "Admin Added Successfully");

    res.redirect("/admin/view");

  } catch (err) {

    console.log(err);

    req.flash("error", "Something Went Wrong");

    res.redirect("back");

  }

};

exports.viewAdmins = async (req, res) => {

  const admins = await Admin.find();

  res.render("viewAdmin", { admins });

};

exports.deleteAdmin = async (req, res) => {

  await Admin.findByIdAndDelete(req.params.id);

  req.flash("success", "Admin Deleted Successfully");

  res.redirect("/admin/view");

};

exports.editPage = async (req, res) => {

  const admin = await Admin.findById(req.params.id);

  res.render("editAdmin", { admin });

};

exports.updateAdmin = async (req, res) => {

  const data = req.body;

  if (data.password && data.password !== "") {

    data.password = await bcrypt.hash(
      data.password,
      10
    );

  } else {

    delete data.password;

  }

  if (req.file) {
    data.avatar = req.file.filename;
  }

  await Admin.findByIdAndUpdate(
    req.params.id,
    data
  );

  req.flash("success", "Admin Updated Successfully");

  res.redirect("/admin/view");

};

exports.changePasswordPage = async (req, res) => {

  try {

    const admin = await Admin.findById(req.params.id);

    res.render("changePassword", { admin });

  } catch (err) {

    console.log(err);

    req.flash("error", "Admin Not Found");

    res.redirect("/admin/view");

  }

};

exports.updatePassword = async (req, res) => {

  try {

    const {
      currentPassword,
      newPassword,
      confirmPassword
    } = req.body;

    const admin = await Admin.findById(req.params.id);

    const matchPassword = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!matchPassword) {

      req.flash("error", "Current Password Incorrect");

      return res.redirect("back");

    }

    if (newPassword !== confirmPassword) {

      req.flash("error", "Passwords Do Not Match");

      return res.redirect("back");

    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await Admin.findByIdAndUpdate(
      req.params.id,
      {
        password: hashedPassword
      }
    );

    req.flash("success", "Password Updated Successfully");

    res.redirect("/admin/view");

  } catch (err) {

    console.log(err);

    req.flash("error", "Something Went Wrong");

    res.redirect("back");

  }

};

exports.profilePage = async (req, res) => {

  try {

    const admin = await Admin.findById(req.user._id);

    res.render("profile", { admin });

  } catch (err) {

    console.log(err);

    req.flash("error", "Profile Not Found");

    res.redirect("back");

  }

};

exports.updateProfile = async (req, res) => {

  try {

    let avatar = req.body.oldImage;

    if (req.file) {
      avatar = req.file.filename;
    }

    await Admin.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      avatar: avatar
    });

    req.flash("success", "Profile Updated Successfully");

    return res.redirect("back");

  } catch (err) {

    console.log(err);

    req.flash("error", "Profile Not Updated");

    return res.redirect("back");

  }

};

exports.forgotPasswordPage = (req, res) => {

  return res.render("forgot-password");

};

exports.sendOTP = async (req, res) => {

  try {

    const email = req.body.email;

    const otp = Math.floor(
      100000 + Math.random() * 900000
    );

    req.session.otp = otp;
    req.session.email = email;

    await transporter.sendMail({

      from: "7913hiyashah@gmail.com",

      to: email,

      subject: "OTP Verification",

      text: `Your OTP is ${otp}`

    });

    req.flash(
      "success",
      "OTP Sent Successfully"
    );

    return res.redirect("/admin/verify-otp");

  } catch (err) {

    console.log(err);

    req.flash(
      "error",
      "OTP Not Sent"
    );

    return res.redirect("/admin/forgot-password");

  }

};

exports.verifyOtpPage = (req, res) => {

  return res.render("verify-otp");

};

exports.verifyOTP = async (req, res) => {

  try {

    const admin = await Admin.findOne({
      email: req.session.resetEmail
    });

    if (
      admin &&
      admin.otp == req.body.otp &&
      admin.otpExpire > Date.now()
    ) {

      req.flash("success", "OTP Verified");

      return res.redirect("/admin/reset-password");

    }

    req.flash("error", "Invalid OTP");

    return res.redirect("back");

  } catch (err) {

    console.log(err);

    return res.redirect("back");

  }

};

exports.resetPasswordPage = (req, res) => {

  return res.render("reset-password");

};

exports.resetPassword = async (req, res) => {

  try {

    const {
      newPassword,
      confirmPassword
    } = req.body;

    if (newPassword !== confirmPassword) {

      req.flash("error", "Passwords Do Not Match");

      return res.redirect("back");

    }

    const hashPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await Admin.findOneAndUpdate(
      {
        email: req.session.resetEmail
      },
      {
        password: hashPassword,
        otp: null,
        otpExpire: null
      }
    );

    delete req.session.resetEmail;

    req.flash(
      "success",
      "Password Reset Successfully"
    );

    return res.redirect("/admin/login");

  } catch (err) {

    console.log(err);

    return res.redirect("back");

  }

};