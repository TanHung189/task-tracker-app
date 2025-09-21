const fs = require("fs").promises;

const loadTasks = async () => {
  try {
    const data = await fs.readFile("tasks.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const saveTasks = async (tasks) => {
  await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2));
};

module.exports = { loadTasks, saveTasks };
