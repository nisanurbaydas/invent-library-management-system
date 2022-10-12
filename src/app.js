const express = require("express");
const cookieParser = require("cookie-parser");

const db = require("./loaders/postgreDB");
const BookRoutes = require("./routes/Book");
const UserRoutes = require("./routes/User");
const errorHandler = require("./middlewares/errorHandler");

db.authenticate()
  .then(() => console.log("DB Connection successful..."))
  .catch((err) => console.log("Error: " + err));

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  app.use("/users", UserRoutes);
  app.use("/books", BookRoutes);

  app.use((req, res, next) => {
    const error = new Error("Page you are looking for does not exist");
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});

module.exports = app;
