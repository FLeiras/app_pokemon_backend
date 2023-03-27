const express = require("express");
const path = require("path");
const morgan = require("morgan");

const { mongoose } = require("./database");

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/pokemon", require("./routes/pokemon.routes"));

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
