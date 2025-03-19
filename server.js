const express = require('express');

const app = express();

app.use(express.static("public"))
app.use(express.json())

app.use(express.static('public'));

app.get('/', renderHomePage)
function renderHomePage(req, res, next) {
    res.status(200).sendFile(__dirname + "/index.html")
}

const salinityRouter = require("./salinity");
app.use("/salinity", function (req, res, next) {
    next();
}, salinityRouter)

app.listen(3000);
console.log("Server listening at http://localhost:3000")

