const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const Admin = require("../models/adminSchema");

passport.use(

  new LocalStrategy(

    {
      usernameField: "email"
    },

    async (email, password, done) => {

      try {

        console.log("Login Email :", email);

        const admin = await Admin.findOne({ email });

        console.log("Admin Data :", admin);

        if (!admin) {

          console.log("Admin Not Found");

          return done(null, false);

        }

        const match = await bcrypt.compare(
          password,
          admin.password
        );

        console.log("Password Match :", match);

        if (!match) {

          console.log("Wrong Password");

          return done(null, false);

        }

        console.log("Login Successful");

        return done(null, admin);

      } catch (err) {

        console.log("Passport Error :", err);

        return done(err);

      }

    }

  )

);

passport.serializeUser((admin, done) => {

  console.log("Serialize User :", admin.id);

  done(null, admin.id);

});

passport.deserializeUser(async (id, done) => {

  try {

    console.log("Deserialize User :", id);

    const admin = await Admin.findById(id);

    done(null, admin);

  } catch (err) {

    console.log(err);

    done(err);

  }

});

module.exports = passport;