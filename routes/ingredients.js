const express = require("express");

// Controllers
const {
  ingredientList,
  ingredientUpdate,
  ingredientDelete,
  feachIngredient,
} = require("../controllers/ingredientController");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const ingredient = await feachIngredient(ingredientId, next);

  if (ingredient) {
    req.ingredient = ingredient;
    next();
  } else {
    const err = new Error("Ingredient not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", ingredientList);

// Delete
router.delete("/:ingredientId", ingredientDelete);

// Update
// router.put("/:ingredientId", upload.single("image"), ingredientUpdate);

module.exports = router;
