const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { loadTasks, saveTasks } = require("./tasks");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Route cho UI
app.get("/", async (req, res) => {
  const tasks = await loadTasks();
  res.render("index", { tasks });
});

// API endpoints
app.post("/add", async (req, res) => {
  const tasks = await loadTasks();
  const newTask = {
    id: tasks.length + 1,
    description: req.body.description,
    done: false,
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  res.redirect("/");
});

app.post("/done/:id", async (req, res) => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.map((task) =>
    task.id === parseInt(req.params.id) ? { ...task, done: true } : task
  );
  await saveTasks(updatedTasks);
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter(
    (task) => task.id !== parseInt(req.params.id)
  );
  await saveTasks(updatedTasks);
  res.redirect("/");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
