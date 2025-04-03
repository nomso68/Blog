const express = require("express");
const postRoutes = require("./routes/post-routes");
const appRouter = express();

appRouter.use("/posts", postRoutes);

module.exports = appRouter;
