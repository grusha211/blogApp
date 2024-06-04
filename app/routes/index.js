const articleRoutes = require("./articleRoutes");
const userRoutes = require("./userRoutes");

const initRoutes = (app) => {
  app.use("/user", userRoutes());
  app.use("/articles",articleRoutes());
};

module.exports = initRoutes;
