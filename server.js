const express = require("express");
const app = express();

const connectDB = require("./config/db");

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to the API..." }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/plans", require("./routes/plans"));

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
