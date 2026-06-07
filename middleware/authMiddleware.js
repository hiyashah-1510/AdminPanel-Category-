module.exports.checkAuthentication = (req, res, next) => {

  console.log("Is Authenticated :", req.isAuthenticated());

  console.log("User :", req.user);

  if (req.isAuthenticated()) {

    return next();

  }

  return res.redirect("/admin/login");

};

module.exports.checkLogin = (req, res, next) => {

  if (req.isAuthenticated()) {

    return res.redirect("/admin");

  }

  return next();

};