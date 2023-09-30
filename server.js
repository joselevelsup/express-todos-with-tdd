const express = require("express");

const app = express();

//Middleware to make sure that all requests are parsed to JSON
app.use(express.json());

//The middleware to check if the user is authenticated through a query
function checkIfAuthenticated(request, response, next) {
  const isAuthenticated = request.query.isAuthenticated;

  if (isAuthenticated) {
    next();
  } else {
    response.status(401).json({
      success: false,
      message: "You are not authenticated",
    });
  }
}

// Our in memory database
const todos = [];

//GET route to just return our todos
app.get("/", function (_request, response) {
  response.status(200).json({
    success: true,
    todos,
  });
});

//GET route to return one todo by it's ID
app.get("/todo/:id", checkIfAuthenticated, function (request, response) {
  const { id } = request.params;

  const foundTodo = todos.find((todo) => todo.id === parseInt(id));

  if (foundTodo) {
    response.status(200).json({
      success: true,
      todo: foundTodo,
    });
  } else {
    response.status(404).json({
      success: false,
      todo: null,
    });
  }
});

//POST route to create one todo
app.post("/todo", function (request, response) {
  const { todo } = request.body;

  todos.push({
    id: todos.length + 1,
    todo,
  });

  response.status(201).json({
    success: true,
  });
});

//DELETE route to remove one todo by it's ID
app.delete("/todo/:id", checkIfAuthenticated, function (request, response) {
  const { id } = request.params;

  todos = todos.filter((todo) => todo.id != parseInt(id));

  response.status(200).json({
    success: true,
  });
});

module.exports = app;
