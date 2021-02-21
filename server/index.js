const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// ROUTES //
// create todo
app.post('/todos', async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
		// using this $1 insted of bckticks and ${}
		res.json(newTodo.rows[0]);
	} catch (error) {
		console.log(error.message);
	}
});

// get all todos
app.get('/todos', async (req, res) => {
	try {
		const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id');
		res.json(allTodos.rows);
	} catch (error) {
		console.log(error.message);
	}
});
// get a todo
app.get('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await pool.query(`SELECT * FROM todo WHERE todo_id = ${id}`);
		if (todo.rowCount == 0) {
			res.status(404).json('Todo not found');
		} else {
			res.json(todo.rows[0]);
		}
	} catch (error) {
		console.log(error.message);
	}
});

//update a todo
app.put('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updatedTodo = await pool.query(`UPDATE todo SET description = $1 WHERE todo_id = $2`, [description, id]);
		res.json('Todo was updated');
	} catch (error) {
		console.log(error.message);
	}
});

//complete task
app.patch('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { completed } = req.body;
		const updatedTodo = await pool.query(`UPDATE todo SET completed = $1 WHERE todo_id = $2`, [completed, id]);
		res.json('Todo was completed');
	} catch (error) {
		console.log(error.message);
	}
});

//delete todo
app.delete('/todos/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
		res.json('Todo was deleted');
	} catch (error) {
		console.log(error.message);
	}
});

app.listen(port, () => {
	console.log('Server Running on port ' + port);
});
