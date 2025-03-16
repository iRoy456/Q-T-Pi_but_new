cat <<EOL > server/server.js
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

// Routes
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

app.get("/queue", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/queue.html"));
});

app.get("/mainpage", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/mainpage.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(\Server running at http://localhost:\${PORT}\);
});
EOL
