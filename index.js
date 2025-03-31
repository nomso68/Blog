const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let url = req.url;
  let method = req.method;
  if (url === "/") {
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

    const example = fs.readFileSync("example.txt", "utf-8");
    console.log(example);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify("This is the home route"));
  }
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
});

const port = 8000;
server.listen(port, () => console.log("App listening at port " + port));
