import axios from "axios";

const LOCAL_KEY = "todos";
const API_URL = "https://dummyjson.com/todos";

// Fetch from API only once, then store in localStorage
export const fetchAllTodos = async () => {
  const cached = localStorage.getItem(LOCAL_KEY);
  if (cached) {
    // If there is cached data, return it
    return JSON.parse(cached);
  } else {
    // If there is no cached data, fetch from API
    const response = await axios.get(API_URL);
    const todos = response.data.todos;

    // Save the fetched todos to localStorage
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));

    // Return the fetched todos
    return todos;
  }
};

export const fetchTodoById = async (id) => {
  const cached = localStorage.getItem(LOCAL_KEY);
  if (cached) {
    const todos = JSON.parse(cached);
    const todo = todos.find((todo) => todo.id === Number(id));
    if (todo) return todo;
  }
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTodo = async ({ todo }) => {
  const cached = localStorage.getItem("todos");
  const todos = cached ? JSON.parse(cached) : [];
  // Find the highes Id 
  let heighestId = 0;
  for (let t of todos) {
    if (t.id > heighestId) {
      heighestId = t.id
    }
  }
  const newTodo = {
    id: heighestId + 1, // Increment the highest ID
    todo,
    completed: false,
    userId: 1,
  };
  const updatedTodos = [newTodo, ...todos];
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return newTodo;
};

export const updateTodo = async (updatedTodo) => {
  const cached = localStorage.getItem(LOCAL_KEY);
  const todos = cached ? JSON.parse(cached) : [];

  //Find the todo with the same id
  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index !== -1) {
    // Replace the old todo with the updated one
    todos[index] = { ...todos[index], ...updateTodo }
    // Save the updated todos back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    // Return the updated todo
    return todos[index];
  } else {
    return null;
  }
};

export const deleteTodo = async (id) => {
  const cached = localStorage.getItem(LOCAL_KEY);
  const todos = cached ? JSON.parse(cached) : [];
  // Find the todo to delete
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    const [deletedTodo] = todos.splice(index, 1);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
    return deletedTodo;
  } else {
    return null;
  }
};