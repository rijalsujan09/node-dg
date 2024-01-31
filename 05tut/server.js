const http = require("http");
const path = require("path");
const fs = require("fs");
const { error } = require("console");
const fsPromise = require("fs").promises;

const { eventLogger } = require("./logEvents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on("log", (msg, abc) => eventLogger(msg, abc));

const PORT = process.env.PORT || 3500;

const server = http.createServer((req, res) => {
    console.log(`-> URL = ${req.url}\n->Method = ${req.method}`);
    myEmitter.emit("log", req.method, req.url);

    fs.readFile(
        path.join(__dirname, "views", "index.html"),
        "utf8",
        (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data);
            res.end();
        }
    );
});

server.listen(PORT, () => {
    console.log(`server running on port: ${PORT} at http://localhost:${PORT}`);
});

process.on("uncaughtException", (error) => {
    console.log(error);
    process.exit(0);
});
