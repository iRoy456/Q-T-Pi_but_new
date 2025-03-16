const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files

// In-memory storage for users and queues
let users = [];
let queues = [];

// Helper function to generate unique IDs
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Helper function to generate a unique 6-digit queue code
function generateQueueCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Routes

// 1. Signup API
app.post("/api/signup", (req, res) => {
    const { username, phone, password, confirmPassword, role } = req.body;

    // Validate input
    if (!username || !phone || !password || !confirmPassword || !role) {
        return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if user already exists
    const userExists = users.find((user) => user.phone === phone);
    if (userExists) {
        return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = { id: generateId(), username, phone, password, role };
    users.push(newUser);

    res.status(201).json({ message: "Signup successful", user: newUser });
});

// 2. Login API
app.post("/api/login", (req, res) => {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
        return res.status(400).json({ error: "Username, password, and role are required" });
    }

    // Find user
    const user = users.find((user) => user.username === username && user.password === password && user.role === role);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
});

// 3. Create a Queue (Admin)
app.post("/api/queue/create", (req, res) => {
    const { name, adminId } = req.body;

    // Validate input
    if (!name || !adminId) {
        return res.status(400).json({ error: "Queue name and admin ID are required" });
    }

    // Check if the user is an admin
    const admin = users.find((user) => user.id === adminId && user.role === "admin");
    if (!admin) {
        return res.status(403).json({ error: "Only admins can create queues" });
    }

    // Create new queue
    const newQueue = {
        id: generateId(),
        code: generateQueueCode(), // Generate a unique 6-digit code
        name,
        adminId,
        status: "stopped", // stopped, started
        members: [], // List of user IDs in the queue
        currentPosition: 0, // Tracks the current position in the queue
    };
    queues.push(newQueue);

    res.status(201).json({ message: "Queue created successfully", queue: newQueue });
});

// 4. Join a Queue (User)
app.post("/api/queue/join", (req, res) => {
    const { queueCode, userId } = req.body;

    // Validate input
    if (!queueCode || !userId) {
        return res.status(400).json({ error: "Queue code and user ID are required" });
    }

    // Find queue
    const queue = queues.find((q) => q.code === queueCode);
    if (!queue) {
        return res.status(404).json({ error: "Queue not found" });
    }

    // Check if the user is already in the queue
    if (queue.members.includes(userId)) {
        return res.status(400).json({ error: "User already in the queue" });
    }

    // Add user to the queue
    queue.members.push(userId);

    res.status(200).json({ message: "Joined queue successfully", queue });
});

// 5. Get Queue Status (User)
app.get("/api/queue/status/:queueCode", (req, res) => {
    const { queueCode } = req.params;

    // Find queue
    const queue = queues.find((q) => q.code === queueCode);
    if (!queue) {
        return res.status(404).json({ error: "Queue not found" });
    }

    // Calculate estimated wait time (assume 2 minutes per person)
    const waitTime = (queue.members.length - queue.currentPosition) * 2;

    res.status(200).json({
        queue,
        waitTime: `${waitTime} minutes`, // Estimated wait time
        currentPosition: queue.currentPosition,
    });
});

// Serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/firstpage.html"));
});

app.get("/signuppage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/signuppage.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/user.html"));
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
});

app.get("/queue", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/queue.html"));
});

app.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});