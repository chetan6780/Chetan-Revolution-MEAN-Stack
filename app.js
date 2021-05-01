const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Fix warnings
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Database connection
mongoose.connect("mongodb://localhost:27017/note", mongoOptions, (err, db) => {
    if (err) throw err;
    console.log("Successfully connected to Database");
});

const app = express();
app.use(express.json());

app.use(cors());


const note = require("./routes/note-routes");
app.use("/note", note);

const port = 3000;

app.get("/", (req, res) => {
    console.log("basic route hit");
    res.json({ success: true, message: "Base route hit!" });
});

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
