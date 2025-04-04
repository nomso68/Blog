const express = require("express");
const postRoutes = require("./routes/post-routes");
const userRoutes = require("./routes/user-routes");

const appRouter = express();

appRouter.use("/posts", postRoutes);
appRouter.use("/users", userRoutes);

module.exports = appRouter;
