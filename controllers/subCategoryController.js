const Category = require("../models/categorySchema");
const SubCategory = require("../models/subCategorySchema");

exports.addPage = async (req, res) => {

    try {

        const category = await Category.find({
            isDeleted: false
        });

        return res.render("add-subcategory", {
            category
        });

    } catch (err) {

        console.log(err);

        return res.redirect("back");

    }

};

exports.insertSubCategory = async (req, res) => {

    try {

        await SubCategory.create({

            categoryId: req.body.categoryId,

            subCategoryName: req.body.subCategoryName

        });

        req.flash(
            "success",
            "Sub Category Added Successfully"
        );

        return res.redirect("/subcategory/view");

    } catch (err) {

        console.log(err);

        req.flash(
            "error",
            "Sub Category Not Added"
        );

        return res.redirect("back");

    }

};

exports.viewSubCategory = async (req, res) => {

    const subCategory = await SubCategory
        .find({
            isDeleted: false
        })
        .populate("categoryId");

    console.log(subCategory);

    res.render("view-subcategory", {
        subCategory
    });
};

exports.deleteSubCategory = async (req, res) => {

    try {

        await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: true
            }
        );

        req.flash(
            "success",
            "Sub Category Moved To Trash"
        );

        return res.redirect(
            "/subcategory/view"
        );

    } catch (err) {

        console.log(err);

        return res.redirect("back");

    }

};

exports.trashPage = async (req, res) => {

    try {

        const subCategory = await SubCategory
            .find({
                isDeleted: true
            })
            .populate("categoryId");

        return res.render(
            "trash-subcategory",
            {
                subCategory
            }
        );

    } catch (err) {

        console.log(err);

        return res.redirect("back");

    }

};

exports.restoreSubCategory = async (req, res) => {

    try {

        await SubCategory.findByIdAndUpdate(
            req.params.id,
            {
                isDeleted: false
            }
        );

        req.flash(
            "success",
            "Sub Category Restored Successfully"
        );

        return res.redirect(
            "/subcategory/trash"
        );

    } catch (err) {

        console.log(err);

        req.flash(
            "error",
            "Sub Category Not Restored"
        );

        return res.redirect("back");

    }

};

exports.permanentDelete = async (req, res) => {

    try {

        await SubCategory.findByIdAndDelete(
            req.params.id
        );

        req.flash(
            "success",
            "Sub Category Deleted Permanently"
        );

        return res.redirect(
            "/subcategory/trash"
        );

    } catch (err) {

        console.log(err);

        req.flash(
            "error",
            "Sub Category Not Deleted"
        );

        return res.redirect("back");

    }

};