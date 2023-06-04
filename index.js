import express from "express";
import path from "path"; //this is used to fetch the user folder path - NODEJS FOLDER
import fs from "fs"; //this is used to read and write data from the file
import { error } from "console";

const app = express();
const PORT = 8000;
const __dirname = path.resolve();
const fn = __dirname + "/userList.csv";

// middleware
app.use(express.urlencoded());

//these are called routers
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/src/loginForm.html");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}`;

  fs.readFile(fn, (error, data) => {
    error && console.log(error.message);
    const userStr = data.toString();
    const userArg = userStr.split("\n");

    if (userArg.includes(str)) {
      console.log(str);
      res.send("<p>Login Successful.</p>");
    } else {
      res.send("<p>Invalid Login, Please Check!</p>");
    }
  });

  //   res.sendFile(__dirname + "/src/loginForm.html");
});

app.get("/registration", (req, res) => {
  console.log(req.query);
  res.sendFile(__dirname + "/src/regForm.html");
});

app.post("/registration", (req, res) => {
  const { email, password } = req.body;
  const str = `${email}, ${password}\n`;

  fs.appendFile(fn, str, (error) => {
    error
      ? console.log(error.message)
      : console.log("The content has been added.");
  });
  res.sendFile(__dirname + "/src/regForm.html");
});

app.get("/", (req, res) => {
  res.send(`
  <h1>This is our home router page.</h1>
  <a href="/registration">
  <button>Register!</button>
  </a>
  <a href="/login">
  <button>Login!</button>
  </a>
  `);
});

app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`Server running at http://localhost:${PORT}`);
});
