const { DataTypes, Model } = require("sequelize");
const db = require("../db");
//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Recipe extends Model {}

Recipe.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },

    instruction: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: db,
  }
);
SequelizeSlugify.slugifyModel(Recipe, {
  source: ["name"],
});
module.exports = Recipe;
