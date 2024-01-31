const fs = require("fs");
const path = require("path");

let rs = fs.createReadStream(path.join(__dirname, "logs", "eventLog.txt"), {
    encoding: "utf8",
});

let ws = fs.createWriteStream(
    path.join(__dirname, "logs", "new_EventLogg.txt"),
    {
        encoding: "utf8",
    }
);

rs.on("data", (datChunck) => {
    ws.write(datChunck);
});

// rs.pipe(ws);
