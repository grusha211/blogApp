const express = require("express");
const passport = require("passport");

const {articleController} = require("../controllers");


const articleRoutes = () => {
  const articleRoutes = express.Router();
  
  const authenticate = passport.authenticate('jwt', { session: false });
  articleRoutes.use(authenticate);
  
  articleRoutes.get("/getall", articleController.getAllArticles);
  articleRoutes.get("/find/:slug", articleController.getArticleBySlug);
  articleRoutes.post("/create",articleController.createArticle);
  articleRoutes.put("/update/:slug", articleController.updateArticle);
  articleRoutes.delete("/delete/:slug", articleController.deleteArticle);
  articleRoutes.get("/search",articleController.searchArticles);

  return articleRoutes;
};

module.exports = articleRoutes