document.getElementById("planetForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const formError = document.getElementById("formError");

    // Get data
    const planetName = document.getElementById("planetName").value;
    const planetRadius = document.getElementById("planetRadius").value;
    const lifeExists = document.getElementById("lifeExistence").checked;

    // Validation
    formError.textContent = '';
    const errorMessage = validateForm(planetName, planetRadius);
    if (errorMessage) {
        formError.textContent = errorMessage;
        return;
    }

    // Update display
    updateDisplay(planetName, planetRadius, lifeExists);

});

function validateForm(planetName, planetRadius) {

    if (!planetName.match(/^[a-zA-Z0-9 ]+$/)) {
        return "Planet name should contain only letters, numbers, and spaces.";
    }

    const minRadius = 1000;
    const maxRadius = 200000;
    if (planetRadius < minRadius || planetRadius > maxRadius) {
        return `Planet radius should be between ${minRadius} and ${maxRadius} km.`;
    }

    return null;
}

function updateDisplay(planetName, planetRadius, lifeExists) {
    const planetDisplay = document.getElementById("planetDisplay");
    const newRadius = Math.max(10, Math.min(300, planetRadius/100));
    planetDisplay.style.width = `${newRadius}px`;
    planetDisplay.style.height = `${newRadius}px`;
    planetDisplay.style.backgroundColor = lifeExists ? "green" : "grey";

    // Update table in a lazy but fast way
    const table = document.getElementById("planetInfo");
    table.innerHTML = `
        <tr>
            <th>Property</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>Name</td>
            <td>${planetName}</td>
        </tr>
        <tr>
            <td>Radius</td>
            <td>${planetRadius} km</td>
        </tr>
        <tr>
            <td>Life Exists</td>
            <td>${lifeExists ? "Yes" : "No"}</td>
        </tr>
    `;
}