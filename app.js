const express = require("express");

// cos
const cors = require("cors");

// body
const bodyParser = require("body-parser");

// db
const db = require("./db");

const { Ingredient } = require("./db/models");
const { Category } = require("./db/models");
const { Recipe } = require("./db/models");

// Route
const categoryRoutes = require("./routes/categories");
const ingredientRoutes = require("./routes/ingredients");
const recipeRoutes = require("./routes/recipes");

const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/categories", categoryRoutes);
app.use("/ingredients", ingredientRoutes);
app.use("/recipes", recipeRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));

// Not found path
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

// Error Handling Middlewae
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json(err.message || " Internal Server Error");
});

const run = async () => {
  try {
    await db.sync({ alter: true });

    // const amidala = await Recipe[2];
    // const queen = await Ingredient[5];

    // await amidala.addIngredient(queen);
    // const result = await Recipe.findOne({
    //   where: { name: "cake" },
    //   include: Ingredient,
    // });
    // console.log(result);

    // await db.sync({ force: true }); // empty db
    // await db.sync({ alter: true });
    // console.log("Connection to the database successful!");
    // const ingredients = await Fabric.findAll();
    // ingredients.forEach((ingredient) => console.log(ingredient.toJSON()));
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();
