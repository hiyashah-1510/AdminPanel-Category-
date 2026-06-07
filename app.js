const express = require("express");
const path = require("path");

const session = require("express-session");
const passport = require("./config/passport");
const flash = require("connect-flash");

const app = express();
const port = 9006;

const connectDB = require("./config/db");
const subCategoryRoutes = require("./routes/subCategoryRoutes");

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "public/assets/uploads")
  )
);

app.use(

  session({

    secret: "adminpanel",

    resave: false,

    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }

  })

);

app.use(flash());

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {

  res.locals.user = req.user;

  res.locals.success = req.flash("success");

  res.locals.error = req.flash("error");

  next();

});

app.set("view engine", "ejs");

app.set(
  "views",
  path.join(__dirname, "views")
);

const adminRoutes = require("./routes/adminRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

app.use("/admin", adminRoutes);

app.use("/category", categoryRoutes);

app.use(
    "/subcategory",
    subCategoryRoutes
);

app.get("/", (req, res) => {
  res.redirect("/admin");
});

app.listen(port, () => {

  console.log(
    `Server running at http://localhost:${port}`
  );

});