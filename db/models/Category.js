const { DataTypes, Model } = require("sequelize");
const db = require("../db");
//   slug
const SequelizeSlugify = require("sequelize-slugify");

class Category extends Model {}

Category.init(
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
SequelizeSlugify.slugifyModel(Category, {
  source: ["name"],
});
module.exports = Category;
