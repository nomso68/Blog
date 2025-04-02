// const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());
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

app.get("/", (req, res) => {
  res.send("Welcome to our home route");
});

app.get("/fetchAllBlogs", (req, res) => {
  let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
  let processedBlogs = allBlogs.filter((blog) => blog.deleted === false);
  res.json({
    status: 200,
    success: true,
    data: processedBlogs,
  });
});

app.post("/saveNewBlog", (req, res) => {
  let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
  let id = allBlogs.length + 1;
  req.body.id = id;
  req.body.deleted = false;
  // processedBlogs.push({
  //   title: "My new blog",
  //   description: "This is my new blog",
  // });
  allBlogs.push(req.body);
  fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
  res.json({
    status: 200,
    success: true,
    data: allBlogs.forEach((blog) => {}),
  });
});
app.delete("/deleteBlog", (req, res) => {
  let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
  let id = req.body.id;
  let index = allBlogs.findIndex((blog) => blog.id === id);
  if (index === -1) {
    return res.json({
      status: 404,
      success: false,
      message: "Blog not found",
    });
  }
  allBlogs[index].deleted = true;
  fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
  res.json({
    status: 200,
    success: true,
    data: allBlogs,
  });
});

app.patch("/editBlog", (req, res) => {
  let allBlogs = JSON.parse(fs.readFileSync("./database.json", "utf-8"));
  let id = req.body.id;
  let index = allBlogs.findIndex((blog) => blog.id === id);
  if (index === -1) {
    return res.json({
      status: 404,
      success: false,
      message: "Blog not found",
    });
  }
  allBlogs[index].title = req.body.title || allBlogs[index].title;
  allBlogs[index].description =
    req.body.description || allBlogs[index].description;
  fs.writeFileSync("./database.json", JSON.stringify(allBlogs, null, 2));
  res.json({
    status: 200,
    success: true,
    data: allBlogs,
  });
});
const port = 8000;
// server.listen(port, () => console.log("App listening at port " + port));
app.listen(port, () => {
  console.log("Connected to port " + port);
});
