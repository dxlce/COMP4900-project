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
    document.getElementById("current-salinity").innerHTML = desired_salinity // temp

    xhttp.open("POST", "/salinity", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}