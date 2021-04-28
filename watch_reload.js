const livereload = require("livereload");
const StaticServer = require("static-server");

const server = new StaticServer({
  rootPath: ".", // required, the root of the server file tree
  port: 8080, // required, the port to listen
  followSymlink: true, // optional, defaults to a 404 error
});

server.start(function () {
  console.log("Server listening to", server.port);
});

livereload
  .createServer({
    delay: 200,
    exclusions: [/node_modules/, /\.git/],
  })
  .watch(__dirname);
console.log("livereload server started", __dirname);
