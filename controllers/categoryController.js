const Category = require("../models/categorySchema");

exports.addPage = (req, res) => {

  return res.render("add-category");

};

exports.insertCategory = async (req, res) => {

  try {

    await Category.create({
      categoryName: req.body.categoryName
    });

    req.flash("success", "Category Added");

    return res.redirect("/category/view");

  } catch (err) {

    console.log(err);

    return res.redirect("/category/add");

  }

};

exports.viewCategory = async (req, res) => {

  try {

    const category = await Category.find({
      isDeleted: false
    });

    return res.render("view-category", {
      category
    });

  } catch (err) {

    console.log(err);

    return res.redirect("/admin");

  }

};

exports.deleteCategory = async (req, res) => {

  await Category.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true
    }
  );

  req.flash("success", "Category Moved To Trash");

  return res.redirect("/category/view");

};

exports.editPage = async (req, res) => {

  try {

    const single = await Category.findById(req.params.id);

    return res.render("edit-category", {
      single
    });

  } catch (err) {

    console.log(err);

    return res.redirect("/category/view");

  }

};

exports.updateCategory = async (req, res) => {

  try {

    await Category.findByIdAndUpdate(req.params.id, {
      categoryName: req.body.categoryName
    });

    req.flash("success", "Category Updated");

    return res.redirect("/category/view");

  } catch (err) {

    console.log(err);

    return res.redirect("/category/view");

  }

};

exports.changeStatus = async (req, res) => {

  try {

    const single = await Category.findById(req.params.id);

    await Category.findByIdAndUpdate(req.params.id, {
      status: !single.status
    });

    if (single.status == true) {

      req.flash("success", "Category Deactivated Successfully");

    } else {

      req.flash("success", "Category Activated Successfully");

    }

    return res.redirect("/category/view");

  } catch (err) {

    console.log(err);

    req.flash("error", "Status Not Changed");

    return res.redirect("/category/view");

  }

};

exports.trashPage = async (req, res) => {

  try {

    const category = await Category.find({
      isDeleted: true
    });

    return res.render("trash-category", {
      category
    });

  } catch (err) {

    console.log(err);

    return res.redirect("/category/view");

  }

};

exports.restoreCategory = async (req, res) => {

  try {

    await Category.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: false
      }
    );

    req.flash(
      "success",
      "Category Restored Successfully"
    );

    return res.redirect("/category/trash");

  } catch (err) {

    console.log(err);

    req.flash(
      "error",
      "Category Not Restored"
    );

    return res.redirect("back");

  }

};

exports.permanentDelete = async (req, res) => {

    try {

        await Category.findByIdAndDelete(
            req.params.id
        );

        req.flash(
            "success",
            "Category Deleted Permanently"
        );

        return res.redirect("/category/trash");

    } catch (err) {

        console.log(err);

        req.flash(
            "error",
            "Category Not Deleted"
        );

        return res.redirect("back");

    }

};