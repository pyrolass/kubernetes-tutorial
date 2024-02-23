const app = require("./app");
const server = require("http").createServer(app);

const port = 4011;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
