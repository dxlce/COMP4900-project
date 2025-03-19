const express = require("express")
let router = express.Router();

router.post("/", updateDesiredSalinity)
router.get("/", sendSalinity)

let desiredSalinity = 0

function updateDesiredSalinity(req, res, next) 
{
    desiredSalinity = req.body["desired_salinity"]
    console.log(desiredSalinity)
    res.status(200).end()
}

function sendSalinity(req, res, next) {
    let obj = {
        "desired_salinity": desiredSalinity
    }

    res.status(200).send(JSON.stringify(obj))
}

module.exports = router