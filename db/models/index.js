const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Recipe = require("./Recipe");

Category.hasMany(Ingredient, {
  as: "ingredient",
  foreignKey: "categoryId",
  allowNull: false,
});

Ingredient.belongsTo(Category, { as: "category" });

Ingredient.belongsToMany(Recipe, { through: "Recipe_Ingredient" });
Recipe.belongsToMany(Ingredient, { through: "Recipe_Ingredient" });

// Recipe.hasMany(Ingredient, {
//   as: "ingredient",
//   foreignKey: "recipeId",
//   allowNull: false,
// });

// Ingredient.belongsTo(Recipe, { as: "recipe" });

module.exports = {
  Category,
  Ingredient,
  Recipe,
};
