const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: "7913hiyashah@gmail.com",

    pass: "ivea obkk vrpv ibdf"

  }

});

module.exports = transporter;