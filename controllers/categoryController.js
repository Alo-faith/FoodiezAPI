// Data

const { Category, Ingredient } = require("../db/models");

// slug
const slugify = require("slugify");
const { _attributes } = require("../db");

exports.feachCategory = async (categoryId, next) => {
  try {
    const category = await Category.findByPk(categoryId);
    return category;
  } catch (error) {
    next(error);
  }
};

// List
exports.categoryList = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Ingredient,
          as: "ingredients",
          // attributes: { exclude: ["createdAt", "updatedAt"] },
          attributes: ["id"],
        },
      ],
    });

    res.json(categories);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Create
exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

//   Delete
exports.categoryDelete = async (req, res, next) => {
  try {
    await req.category.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};

// Update
// exports.categoryUpdate = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `${req.protocol}://${req.get("host")}/media/${
//         req.file.filename
//       }`;
//     }

//     await req.category.update(req.body);
//     res.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// };

//   Create
exports.ingredientCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.categoryId = req.category.id;
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
  }
};
