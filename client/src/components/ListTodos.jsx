import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
	const [todos, setTodos] = useState([]);
	const [somethingChecked, checkSomething] = useState(false);

	const checkCompleted = async (id, isCompleted) => {
		const completed = isCompleted === '1' ? '0' : '1';
		const body = { completed };
		try {
			const response = await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
		} catch (error) {
			console.log(error.message);
		}
		checkSomething(!somethingChecked);
	};
	const getTodos = async () => {
		try {
			const response = await fetch('http://localhost:5000/todos');
			const jsonData = await response.json();
			setTodos(jsonData);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		getTodos();
	}, [somethingChecked]);
	const deleteTodo = async (id) => {
		try {
			const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'DELETE',
			});
			setTodos(todos.filter((todo) => todo.todo_id !== id));
		} catch (error) {
			console.log(error.message);
		}
	};
	return (
		<div>
			{' '}
			<table className='table mt-5 text-center'>
				<thead>
					<tr>
						<th className='text-left'>Description</th>
						<th>Completed</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo) => (
						<tr key={todo.todo_id}>
							<td className={`text-left ${todo.completed === '1' ? 'task-completed' : ''}`}>
								{todo.description}
							</td>
							<td>
								<input
									type='checkbox'
									className=''
									checked={todo.completed === '1' ? true : false}
									onChange={() => {
										checkCompleted(todo.todo_id, todo.completed);
									}}
								/>
							</td>
							<td>
								<EditTodo todo={todo} />
							</td>
							<td>
								<button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListTodos;
