import pKg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pKg;

///setting up database connection
let db = new Pool({
  user: "user",
  password: "password",
  host: "db",
  port: 5432,
  database: "db123",
});

/// create user
export async function createUser() {
  try {
    let result = db.query(
      "CREATE TABLE user(userid SERIAL PRIMARY KEY, name VARCHAR(100), FOREIGN KEY(todoid) REFERENCES todo(todoid))"
    );
    return "Table successfully created";
  } catch (error) {
    console.log(error);
  }
}

/// insert User
export async function insertUser(name) {
  try {
    let result = db.query("INSERT INTO user(name) VALUES (name =$1)", [name]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

// “Creating a Todo”
export async function createTodo() {
  try {
    let result = db.query(
      "CREATE TABLE todo(todoid SERIAL PRIMARY KEY, task VARCHAR(100),duedate VARCHAR(100), FOREIGN KEY(userid) REFERENCES user(userid)"
    );
    return "Table successfully created";
  } catch (error) {
    console.log(error);
  }
}

//// insert todo
export async function insertTodo(task, duedate) {
  try {
    let result = db.query(
      "INSERT INTO todo(task, duedate) VALUES (task =$1, duedate=$2)",
      [task, duedate]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

/// update
export async function updateTodo(userid, task, duedate) {
  try {
    let result = db.query(
      "UPDATE todo(task, duedate) VALUES (task =$1, duedate=$2) WHERE userid = $3",
      [userid, task, duedate]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
  }
}

///delete
export async function deleteTodo(userid, task, duedate) {
  try {
    let result = db.query(
      "DELETE todo(task, duedate) VALUES (task =$1, duedate=$2) WHERE userid = $3",
      [userid, task, duedate]
    );
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}
//show
export async function showTodo() {
  try {
    let result = db.query("SELECT * FROM todo");
    return result.rows;
  } catch (error) {
    console.log(error);
  }
}

// “Getting all Todos” for a user by a user id (this can be a mock user id for simplicity)
// for “Updating a Todo” for a user by a user id and the Todo id (can also use a mock user id for simplicity)
//  for “Deleting a Todo” for a user by a user id and the Todo id (can also use a mock user id for simplicity)
