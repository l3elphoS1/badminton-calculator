let players = []; // Store player data

// Add player to the list
function addPlayer() {
    let name = document.getElementById("playerName").value.trim();
    let playHours = parseFloat(document.getElementById("playHours").value);

    if (name === "" || isNaN(playHours) || playHours <= 0) {
        alert("Please enter a valid name and play hours.");
        return;
    }

    // Add player to the list
    players.push({ name, playHours });

    // Update player table
    updatePlayerTable();

    // Clear input fields
    document.getElementById("playerName").value = "";
    document.getElementById("playHours").value = "1";
}

// Update the player table dynamically
function updatePlayerTable() {
    let tableBody = document.getElementById("playerTable");
    tableBody.innerHTML = "";

    players.forEach((player, index) => {
        tableBody.innerHTML += `
            <tr>
                <td>${player.name}</td>
                <td>${player.playHours} hours</td>
                <td><button onclick="removePlayer(${index})">Remove</button></td>
            </tr>
        `;
    });
}

// Remove a player from the list
function removePlayer(index) {
    players.splice(index, 1);
    updatePlayerTable();
}

// Calculate cost proportionally based on playtime
function calculateCost() {
    let courtCost = parseFloat(document.getElementById("courtCost").value);
    let shuttleCost = parseFloat(document.getElementById("shuttleCost").value);
    let additionalCost = parseFloat(document.getElementById("additionalCost").value);

    if (players.length === 0) {
        alert("No players added!");
        return;
    }

    let totalPlayHours = players.reduce((sum, player) => sum + player.playHours, 0);
    let totalCost = courtCost + shuttleCost + additionalCost;

    let resultTable = document.getElementById("resultTable");
    resultTable.innerHTML = "";

    players.forEach(player => {
        let playerCost = ((player.playHours / totalPlayHours) * totalCost).toFixed(2);
        resultTable.innerHTML += `
            <tr>
                <td>${player.name}</td>
                <td>${player.playHours} hours</td>
                <td>${playerCost}</td>
            </tr>
        `;
    });
}
