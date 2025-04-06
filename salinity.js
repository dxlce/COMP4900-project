// const express = require("express")

// let router = express.Router();

// router.post("/", updateCurrentSalinity)
// router.get("/", sendSalinity)

// let desiredSalinity = 0

// let clientSocket = null;
// function updateCurrentSalinity(req, res, next) 
// {
//     console.log(req.body)
//     current_salinity = req.body["current_salinity"]
//     // console.log(current_salinity)
//     // res.setHeader('Content-Type', 'text/event-stream');
//     // res.setHeader('Cache-Control', 'no-cache');
//     // res.setHeader('Connection', 'keep-alive');
//     // res.flushHeaders();

//     // // res.status(200).send(JSON.stringify({current_salinity: current_salinity}))
//     // // res.write(`data: ${JSON.stringify({ current_salinity: current_salinity })}\n\n`);
//     // res.write(`data: ${current_salinity}\n\n`)

//     if (clientSocket) {
//         // Send the updated salinity value to the WebSocket client
//         const salinityData = { currentSalinity: salinity };
//         clientSocket.send(JSON.stringify(salinityData));
//         console.log(`Sent updated salinity to WebSocket client: ${salinity}`);
    
//         // Respond to the POST request with success
//         res.status(200).json({ message: 'Salinity updated and sent to WebSocket client' });
//       } else {
//         res.status(400).json({ message: 'No active WebSocket connection' });
//       }

// }

// function sendSalinity(req, res, next) {
//     let obj = {
//         "desired_salinity": desiredSalinity
//     }

//     res.status(200).send(JSON.stringify(obj))
// }

// module.exports = router