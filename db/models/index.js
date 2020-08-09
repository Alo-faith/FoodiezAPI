const Category = require("./Category");
const Ingredient = require("./Ingredient");
const Recipe = require("./Recipe");

Category.hasMany(Ingredient, {
  as: "ingredients",
  foreignKey: "categoryId",
  allowNull: false,
});

Ingredient.belongsTo(Category, { as: "category" });

Ingredient.belongsToMany(Recipe, {
  through: "Recipe_Ingredient",
  as: "recipe",
  foreignKey: "ingredientId",
});
Recipe.belongsToMany(Ingredient, {
  through: "Recipe_Ingredient",
  as: "ingredients",
  foreignKey: "recipeId",
});

module.exports = {
  Category,
  Ingredient,
  Recipe,
};
