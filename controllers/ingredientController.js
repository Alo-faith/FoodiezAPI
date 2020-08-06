// Data

const { Ingredient } = require("../db/models");
const { Category } = require("../db/models");

// slug
const slugify = require("slugify");
const { _attributes } = require("../db");

exports.feachIngredient = async (ingredientId, next) => {
  try {
    const ingredient = await Ingredient.findByPk(ingredientId);
    return ingredient;
  } catch (error) {
    next(error);
  }
};

// List
exports.ingredientList = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "categoryId"] },

      include: {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
    });

    res.json(ingredients);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.ingredientDelete = async (req, res, next) => {
  try {
    await req.ingredient.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// Update
// exports.ingredientUpdate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `${req.protocol}://${req.get("host")}/media/${
//         req.file.filename
//       }`;
//     }

//     await req.ingredient.update(req.body);
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };
