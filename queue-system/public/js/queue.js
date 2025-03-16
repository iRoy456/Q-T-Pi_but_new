// Dummy queue data (Replace this with data from backend later)
const queueData = {
    id: 1,
    name: "Queue A",
    waitingTime: "15 min",
    lastPersonTime: "12 min",
    currentToken: 5,
    nextToken: 6,
    peopleAhead: 3
};

// Load queue details dynamically
function loadQueueDetails() {
    document.getElementById("queueName").innerText = queueData.name;
    document.getElementById("waitingTime").innerText = queueData.waitingTime;
    document.getElementById("lastPersonTime").innerText = queueData.lastPersonTime;
    document.getElementById("currentToken").innerText = queueData.currentToken;
    document.getElementById("nextToken").innerText = queueData.nextToken;
    document.getElementById("peopleAhead").innerText = queueData.peopleAhead;

    // Create visual representation of people in the queue
    const queueVisual = document.getElementById("queueVisual");
    queueVisual.innerHTML = "";
    for (let i = 0; i < queueData.peopleAhead + 1; i++) {
        const personDiv = document.createElement("div");
        personDiv.classList.add("person");
        queueVisual.appendChild(personDiv);
    }
}

// Leave queue function (Placeholder for now)
// Leave queue function (Placeholder for now)
// Leave queue function
function leaveQueue() {
    alert("You have left the queue!");
    window.location.href = "user.html";  // Redirect back to the user dashboard
}


window.onload = loadQueueDetails;
