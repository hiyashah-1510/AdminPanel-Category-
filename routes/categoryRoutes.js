const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/categoryController");

const { checkAuthentication } = require("../middleware/authMiddleware");

router.get(
  "/add",
  checkAuthentication,
  categoryController.addPage
);

router.post(
  "/insert",
  checkAuthentication,
  categoryController.insertCategory
);

router.get(
  "/view",
  checkAuthentication,
  categoryController.viewCategory
);

router.get(
  "/delete/:id",
  checkAuthentication,
  categoryController.deleteCategory
);

router.get(
  "/edit/:id",
  checkAuthentication,
  categoryController.editPage
);

router.post(
  "/update/:id",
  checkAuthentication,
  categoryController.updateCategory
);

router.get(
  "/status/:id",
  checkAuthentication,
  categoryController.changeStatus
);

router.get(
  "/trash",
  checkAuthentication,
  categoryController.trashPage
);

router.get(
  "/restore/:id",
  checkAuthentication,
  categoryController.restoreCategory
);

router.get(
    "/permanent-delete/:id",
    checkAuthentication,
    categoryController.permanentDelete
);

module.exports = router;