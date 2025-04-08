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
  ws.on('message', (message) => {
    console.log("Received message from client:", message);
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
    current_salinity = req.body["current_salinity"]

    const salinityData = { current_salinity: current_salinity}

    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(salinityData))
    })

    res.status(200).send()
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
