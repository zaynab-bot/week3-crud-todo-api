const express = require('express');

const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false },
];

// GET all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// POST new todo
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({
      error: 'Task is required'
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PATCH update todo
app.patch('/todos/:id', (req, res) => {
  const todo = todos.find(
    (t) => t.id === parseInt(req.params.id)
  );

  if (!todo) {
    return res.status(404).json({
      message: 'Todo not found'
    });
  }

  Object.assign(todo, req.body);

  res.status(200).json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter((t) => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({
      error: 'Not found'
    });
  }

  res.status(204).send();
});

// GET completed todos
app.get('/todos/completed', (req, res) => {
  const completed = todos.filter((t) => t.completed);

  res.json(completed);
});

// GET active todos
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter((t) => !t.completed);

  res.status(200).json(activeTodos);
});

// GET one todo
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  res.status(200).json(todo);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Server error!'
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});