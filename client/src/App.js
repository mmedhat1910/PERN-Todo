import React from 'react';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import './styles/App.scss';

function App() {
	return (
		<div className='App container'>
			<InputTodo />
			<ListTodos />
		</div>
	);
}

export default App;
