const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES//
 
// create todo

app.post("/todos", async(req, res) => {
    try{
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
            );
        res.json(newTodo.rows[0]);
        //console.log(req.body);
    } catch (err) {
        console.error(err.message);
    }
});

// get all todo

app.get("/todos", async(req,res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get a todo

app.get("/todos/:id", async(req,res) => {
    try {
        //console.log(req.params);
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id_todo = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a todo

app.put("/todos/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo set description = $1 WHERE id_todo = $2", 
            [description, id]);
        res.json("todo was updated");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a todo

app.delete("/todos/:id", async (req,res) => {
    try{
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE id_todo = $1", 
            [id]);
            res.json("todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log("server has started on port 3000");
});