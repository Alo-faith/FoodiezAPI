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
          as: "ingredients",
          // attributes: { exclude: ["createdAt", "updatedAt"] },
          attributes: ["id"],
          through: {
            attributes: [],
          },
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

//   add ingredients to recipe

exports.addIngredient = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const addIngredientToRecipe = await Recipe_Ingredient.create(req.body);
    res.status(201).json(addIngredientToRecipe);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }

  // try {
  //   const recipe = await Recipe.findByPk(recipeId);
  //   if (!recipe) {
  //     console.log(" not found!");
  //     return null;
  //   }
  //   const ingredient = await Ingredient.findByPk(ingredientId);
  //   if (!ingredient) {
  //     console.log(" not found!");
  //     return null;
  //   }
  //   recipe.addIngredient(ingredient);

  //   return recipe;
  // } catch (error) {
  //   next(error);
  // }
};
// Update

exports.recipeUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    await req.recipe.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
