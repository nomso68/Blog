// const http = require("http");
const fs = require("fs");
const express = require("express");
const connectToDB = require("./src/config/db");
const dotenv = require("dotenv");
const appRouter = require("./src/app");

dotenv.config();
const app = express();
connectToDB();
app.use(express.json());
app.use("/api/v1", appRouter);

// const server = http.createServer((req, res) => {
//   let url = req.url;
//   let method = req.method;
//   if (url === "/") {
// write file
// fs.writeFile(
//   "new-example.txt",
//   "Hello World, this is coding with Nomso",
//   "utf-8",
//   (err) => {
//     if (err) {
//       throw err;
//       console.log("File written successfully");
//     }
//   }
// );

// read file
// fs.readFile("new-example.txt", "utf-8", (err, data) => {
//   if (err) {throw err;}
//     console.log(data);
// });

//   const example = fs.readFileSync("example.txt", "utf-8");
//   console.log(example);
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify("This is the home route"));
// }
// else if (method === 'POST' && url === "/about") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify("This is the about us route"));
//   } else if (method === "PATCH" && url === "/contact") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify("This is the contact us route"));
//   } else if (url === "/nomso") {
//     res.statusCode = 200;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify("This is the nomso route"));
//   } else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify("This route does not exist"));
//   }
// });

// function processBlogs(data) {
//   if (typeof data === "array") {
//     return data
//       .filter((blog) => blog.deleted === false)
//       .map(({ deleted, ...rest }) => rest); // Exclude the 'deleted' field
//   } else if (typeof data === "object") {
//     return { ...data, deleted: undefined }; // Exclude the 'deleted' field
//   }
// }

// app.get("/", (req, res) => {
//   res.send("Welcome to our home route");
// });

// app.get("/fetchAllBlogs", (req, res) => {
//   let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
//   let processedBlogs = allBlogs
//     .filter((blog) => blog.deleted === false)
//     .map(({ deleted, ...rest }) => rest); // Exclude the 'deleted' field
//   res.json({
//     status: 200,
//     success: true,
//     data: processedBlogs,
//   });
// });

// app.get("/fetchBlog/:id", (req, res) => {
//   let id = Number(req.params.id);
//   let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));

//   let blog = allBlogs.find((blog) => blog.id === id);
//   if (!blog) {
//     return res.json({
//       status: 404,
//       success: false,
//       message: "Blog not found",
//     });
//   }

//   // Exclude the 'deleted' field from the response
//   if (blog.deleted) {
//     return res.json({
//       status: 404,
//       success: false,
//       message: "Blog not found",
//     });
//   }

//   res.json({
//     status: 200,
//     success: true,
//     data: processBlogs(blog),
//   });
// });

// app.post("/saveNewBlog", (req, res) => {
//   let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
//   req.body.id = allBlogs.length + 1;
//   req.body.deleted = false;
//   req.body.createdAt = new Date().toISOString();
//   // processedBlogs.push({
//   //   title: "My new blog",
//   //   description: "This is my new blog",
//   // });
//   allBlogs.push(req.body);
//   fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
//   res.json({
//     status: 200,
//     success: true,
//     data: processBlogs(allBlogs),
//   });
// });
// app.delete("/deleteBlog", (req, res) => {
//   let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
//   let id = req.body.id;
//   let index = allBlogs.findIndex((blog) => blog.id === id);
//   if (index === -1) {
//     return res.json({
//       status: 404,
//       success: false,
//       message: "Blog not found",
//     });
//   }
//   allBlogs[index].deleted = true;
//   fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
//   res.json({
//     status: 200,
//     success: true,
//     data: processBlogs(allBlogs),
//   });
// });

// app.patch("/editBlog", (req, res) => {
//   let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
//   let id = req.body.id;
//   let index = allBlogs.findIndex((blog) => blog.id === id);
//   if (index === -1) {
//     return res.json({
//       status: 404,
//       success: false,
//       message: "Blog not found",
//     });
//   }
//   allBlogs[index].title = req.body.title || allBlogs[index].title;
//   allBlogs[index].description =
//     req.body.description || allBlogs[index].description;
//   fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
//   res.json({
//     status: 200,
//     success: true,
//     data: processBlogs(allBlogs),
//   });
// });

const port = process.env.PORT;
// server.listen(port, () => console.log("App listening at port " + port));
app.listen(port, () => {
  console.log("Connected to port " + port);
});
