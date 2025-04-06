const currentSalinityElement = document.getElementById("current-salinity")

const socket = new WebSocket('ws://localhost:3000', 'echo-protocol');

socket.addEventListener('open', (event) => {
    console.log("Connected to WS server")
})

socket.addEventListener('message', (event) => {
    console.log("Message from server")
    
    data = JSON.parse(event.data)

    if ("current_salinity" in data) {
        currentSalinityElement.innerHTML = data["current_salinity"] + " PSU"
    }
});

// Handle WebSocket error
socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Handle WebSocket closure
socket.onclose = () => {
  console.log('WebSocket connection closed');
};

function clickButton()
{
    let desired_salinity = document.getElementById("input").value;

    if (isNaN(desired_salinity) || desired_salinity === "")
    {
        alert("ERROR: Could not send desired salinity (Your desired salinity is not a number!");
        return;
    }

    let data = {
        desired_salinity: desired_salinity
    }

    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState === 4 && this.status === 200) 
        {
            alert("Desired salinity value sent!");
        }
    }
    document.getElementById("desired-salinity").innerHTML = desired_salinity + " PSU" // temp

    xhttp.open("PUT", "/salinity", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}