const express = require("express");

// Controllers
const {
  recipeCreate,
  recipeList,
  recipeUpdate,
  recipeDelete,
  feachRecipe,
  //   ingredientCreate,
} = require("../controllers/recipeController");

// Middleware
const upload = require("../middleware/multer");

const router = express.Router();

router.param("recipeId", async (req, res, next, recipeId) => {
  const recipe = await feachRecipe(recipeId, next);

  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    const err = new Error("recipe not found");
    err.status = 404;
    next(err);
  }
});

// List
router.get("/", recipeList);

// Create
router.post("/", upload.single("image"), recipeCreate);

// Delete
router.delete("/:recipeId", recipeDelete);

// Update
// router.put("/:recipeId", upload.single("image"), recipeUpdate);

module.exports = router;
