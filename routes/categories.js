const express = require("express");

// Controllers
const {
  categoryCreate,
  categoryList,
  categoryUpdate,
  categoryDelete,
  feachCategory,
  ingredientCreate,
} = require("../controllers/categoryController");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("categoryId", async (req, res, next, categoryId) => {
  const category = await feachCategory(categoryId, next);

  if (category) {
    req.category = category;
    next();
  } else {
    const err = new Error("category not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", categoryList);

// Create
router.post("/", upload.single("image"), categoryCreate);

// Delete
router.delete("/:categoryId", categoryDelete);

// Update
// router.put("/:categoryId", upload.single("image"), categoryUpdate);

// Create ingredient
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

module.exports = router;
