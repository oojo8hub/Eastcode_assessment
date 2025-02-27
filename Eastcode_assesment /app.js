import express from "express";
import {
  insertUser,
  createUser,
  createTodo,
  insertTodo,
  updateTodo,
  deleteTodo,
  showTodo,
} from "./db.js";

let app = express();
let PORT = process.env.PORT || 5500;

/// adding json communication
app.use(express.json());

//// USER END POINT

app.get("/createUser", async (req, res) => {
  try {
    let result = await createUser();
    if (!result) {
      res.status(500).send("Table not created");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});
/// insert user
app.post("/insertUser", async (req, res) => {
  try {
    const { name } = req.body;
    let result = await insertUser(name);
    if (!result) {
      res.status(500).send("Insert failed");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

//// Table endpoint
app.get("/createTodo", async (req, res) => {
  try {
    let result = await createTodo();
    if (!result) {
      res.status(500).send("Table not created");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.post("/insertTodo", async (req, res) => {
  try {
    const { task, duedate } = req.body;
    let result = await insertTodo(task, duedate);
    if (!result) {
      res.status(500).send("Insert failed ");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.put("/updateTodo/:id", async (req, res) => {
  try {
    const { task, duedate } = req.body;
    const { user_id } = req.params;
    let result = await updateTodo(user_id, task, duedate);
    if (!result) {
      res.status(500).send("Update failed");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { task, duedate } = req.body;
    const { user_id } = req.params;
    let result = await deleteTodo(user_id, task, duedate);
    if (!result) {
      res.status(500).send("delete failed ");
    }
    res.status(200).send({ message: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

////test endpoint
app.get("/", (req, res) => {
  console.log("Test One ready");
  res.send("Working");
});

/// listen point
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
