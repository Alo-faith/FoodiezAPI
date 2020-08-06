const { DataTypes, Model } = require("sequelize");
const db = require("../db");
//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Ingredient extends Model {}

Ingredient.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: db,
  }
);
SequelizeSlugify.slugifyModel(Ingredient, {
  source: ["name"],
});
module.exports = Ingredient;
