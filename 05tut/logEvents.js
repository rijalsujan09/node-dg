const fs = require("fs");
const fspromise = fs.promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

exports.eventLogger = async (message, abc) => {
    const dateTime = `${format(new Date(), "yyyy/MM/dd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message} =>  ${abc}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, "logs"))) {
            fspromise.mkdir(path.join(__dirname, "logs"));
        }
        await fspromise.appendFile(
            path.join(__dirname, "logs", "eventLog.txt"),
            logItem
        );
    } catch (error) {
        console.log(error);
    }
};
