const express = require("express");

const router = express.Router();

const subCategoryController = require("../controllers/subCategoryController");

const { checkAuthentication } = require("../middleware/authMiddleware");

router.get(
    "/add",
    checkAuthentication,
    subCategoryController.addPage
);

router.post(
    "/insert",
    checkAuthentication,
    subCategoryController.insertSubCategory
);

router.get(
    "/view",
    checkAuthentication,
    subCategoryController.viewSubCategory
);

router.get(
    "/trash",
    checkAuthentication,
    subCategoryController.trashPage
);

router.get(
    "/delete/:id",
    checkAuthentication,
    subCategoryController.deleteSubCategory
);

router.get(
    "/restore/:id",
    checkAuthentication,
    subCategoryController.restoreSubCategory
);

router.get(
    "/permanent-delete/:id",
    checkAuthentication,
    subCategoryController.permanentDelete
);

module.exports = router;
