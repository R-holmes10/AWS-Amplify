// src/TodoApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      axios.post('http://localhost:3001/todos', { text: newTodo })
        .then(response => setTodos([...todos, response.data]))
        .catch(error => console.error('Error adding todo:', error));
      setNewTodo('');
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};

export default TodoApp;
