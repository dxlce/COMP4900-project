const express = require('express');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);

app.use(express.static("public"))
app.use(express.json())

app.set("view engine", "pug")

const wss = new WebSocket.Server({ server: server });

let desiredSalinity = 0

wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  ws.on('message', (message) => {
    console.log('Received message from client:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});


app.get('/', renderHomePage)
function renderHomePage(req, res, next) {
    res.status(200).render("main", {current_salinity: "N/A"})
}

app.post('/salinity', updateCurrentSalinity)
function updateCurrentSalinity(req, res, next) 
{
    console.log(req.body)
    current_salinity = req.body["current_salinity"]
    // console.log(current_salinity)
    // res.setHeader('Content-Type', 'text/event-stream');
    // res.setHeader('Cache-Control', 'no-cache');
    // res.setHeader('Connection', 'keep-alive');
    // res.flushHeaders();

    // // res.status(200).send(JSON.stringify({current_salinity: current_salinity}))
    // // res.write(`data: ${JSON.stringify({ current_salinity: current_salinity })}\n\n`);
    // res.write(`data: ${current_salinity}\n\n`)

    const salinityData = { current_salinity: current_salinity}

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(salinityData))
    })

    res.status(200).send()

    // if (clientSocket) {
    //     // Send the updated salinity value to the WebSocket client
    //     const salinityData = { currentSalinity: salinity };
    //     clientSocket.send(JSON.stringify(salinityData));
    //     console.log(`Sent updated salinity to WebSocket client: ${salinity}`);
    
    //     // Respond to the POST request with success
    //     res.status(200).json({ message: 'Salinity updated and sent to WebSocket client' });
    //   } else {
    //     res.status(400).json({ message: 'No active WebSocket connection' });
    //   }

}

app.get('/salinity', sendSalinity)
function sendSalinity(req, res, next) {
    let obj = {
        "desired_salinity": desiredSalinity
    }

    res.status(200).send(JSON.stringify(obj))
}

app.put('/salinity', updateDesiredSalinity) 
function updateDesiredSalinity(req, res, next) {
    desiredSalinity = req.body["desired_salinity"]
    console.log(desiredSalinity)
    res.status(200).send();
}


server.listen(3000, () => console.log("Listening on port 3000"))
console.log("Server listening at http://localhost:3000")

