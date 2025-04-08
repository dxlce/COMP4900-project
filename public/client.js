const currentSalinityElement = document.getElementById("current-salinity")

// NOTE: Replace "localhost:3000" with IP address
const socket = new WebSocket('ws://localhost:3000', "echo-protocol");

socket.addEventListener('message', (event) => {
    
    data = JSON.parse(event.data)

    if ("current_salinity" in data) {
        currentSalinityElement.innerHTML = data["current_salinity"] + " PSU"
    }
});

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
}

socket.onclose = () => {
  console.log("WebSocket connection closed");
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