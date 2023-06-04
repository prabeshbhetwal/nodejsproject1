import { EventEmitter } from "events";
import express from "express";
const app = express();

const myEmitter = new EventEmitter();

myEmitter.on("emitMsg", () => {
  console.log("This is inside the emitter inside the response.");
});

app.get("/contact", (_req, res) => {
  res.send("this is a contact page.");
});

app.get("/register", (_req, res) => {
  res.send("Registration Page");
});

app.get("/", (req, res) => {
  res.send("this is a response");
  myEmitter.emit("emitMsg");
});

app.listen(8000, (error) => {
  error
    ? console.log(error.message)
    : console.log("Server running at http://localhost:8000");
});
