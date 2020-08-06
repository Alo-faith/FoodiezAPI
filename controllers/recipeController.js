// Data

const { Category, Ingredient, Recipe } = require("../db/models");

// slug
const slugify = require("slugify");
const { _attributes } = require("../db");

exports.feachRecipe = async (recipeId, next) => {
  try {
    const recipe = await Recipe.findByPk(recipeId);
    return recipe;
  } catch (error) {
    next(error);
  }
};

// List
exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Ingredient,
          as: "ingredient",
          // attributes: { exclude: ["createdAt", "updatedAt"] },
          attributes: ["id"],
        },
      ],
    });

    res.json(recipes);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Create
exports.recipeCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.recipeDelete = async (req, res, next) => {
  try {
    await req.recipe.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Create
// exports.ingredientCreate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `${req.protocol}://${req.get("host")}/media/${
//         req.file.filename
//       }`;
//     }
//     req.body.categoryId = req.category.id;
//     const newIngredient = await Ingredient.create(req.body);
//     res.status(201).json(newIngredient);
//   } catch (error) {
//     next(error);
//     // res.status(500).json({ message: error.message });
//   }
// };
