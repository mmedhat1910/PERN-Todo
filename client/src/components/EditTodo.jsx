import React, { useState } from 'react';

const EditTodo = ({ todo }) => {
	const [description, setDescription] = useState(todo.description);

	const editListener = async () => {
		try {
			const body = { description };
			const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
		} catch (error) {
			console.log(error.message);
		}
		window.location = '/';
	};

	return (
		<div>
			<button type='button' class='btn btn-warning' data-toggle='modal' data-target={`#modal${todo.todo_id}`}>
				Edit
			</button>

			<div class='modal' id={`modal${todo.todo_id}`}>
				<div class='modal-dialog'>
					<div class='modal-content'>
						<div class='modal-header'>
							<h4 class='modal-title'>Edit Task</h4>
							<button type='button' class='close' data-dismiss='modal'>
								&times;
							</button>
						</div>

						<div class='modal-body'>
							<input
								type='text'
								className='form-control'
								value={description}
								onChange={async (e) => {
									setDescription(e.target.value);
								}}
							/>
						</div>

						<div class='modal-footer'>
							<button
								type='button'
								class='btn btn-warning'
								data-dismiss='modal'
								onClick={() => editListener()}
							>
								Edit
							</button>
							<button
								type='button'
								class='btn btn-danger'
								data-dismiss='modal'
								onClick={() => setDescription(todo.description)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditTodo;
