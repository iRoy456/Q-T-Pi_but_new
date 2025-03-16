// Dummy queue data
const queues = [
    { id: 1, name: "Queue A", waitingTime: "10 min", people: 5, password: "1234" },
    { id: 2, name: "Queue B", waitingTime: "20 min", people: 8, password: "5678" },
    { id: 3, name: "Queue C", waitingTime: "5 min", people: 2, password: "abcd" }
];

// Load queues dynamically
function loadQueues() {
    const container = document.getElementById("queuesContainer");
    container.innerHTML = "";
    queues.forEach(queue => {
        const queueDiv = document.createElement("div");
        queueDiv.classList.add("queue");
        queueDiv.innerHTML = `
            <h3>${queue.name}</h3>
            <p>Waiting Time: ${queue.waitingTime}</p>
            <p>People in Queue: ${queue.people}</p>
            <button onclick="openPopup(${queue.id})">Join Queue</button>
        `;
        container.appendChild(queueDiv);
    });
}

// Open password popup
let selectedQueueId = null;
function openPopup(queueId) {
    selectedQueueId = queueId;
    document.getElementById("queuePopup").style.display = "block";
}

// Close popup
function closePopup() {
    document.getElementById("queuePopup").style.display = "none";
}

// Join queue with password check
function joinQueue() {
    const passwordInput = document.getElementById("queuePassword").value;
    const queue = queues.find(q => q.id === selectedQueueId);

    if (queue && passwordInput === queue.password) {
        alert(Joined ${queue.name} successfully!);
        closePopup();
    } else {
        alert("Incorrect password!");
    }
}

window.onload = loadQueues;
