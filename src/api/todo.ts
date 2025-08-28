import axios from "axios";

const LOCAL_KEY = "todos";
const API_URL = "https://dummyjson.com/todos";

// Todo interface with proper typing
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  description?: string;
  createdAt?: string;
}

// API Response types
interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// Update todo parameters
interface UpdateTodoParams {
  id: number;
  todo?: string;
  completed?: boolean;
  description?: string;
  userId?: number;
}

// Type guard to check if something is a Todo
export const isTodo = (obj: unknown): obj is Todo => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'todo' in obj &&
    'completed' in obj &&
    'userId' in obj &&
    typeof (obj as Todo).id === 'number' &&
    typeof (obj as Todo).todo === 'string' &&
    typeof (obj as Todo).completed === 'boolean' &&
    typeof (obj as Todo).userId === 'number'
  );
};

// Fetch from API only once, then store in localStorage
export const fetchAllTodos = async (): Promise<Todo[]> => {
  try {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      // If there is cached data, return it
      return JSON.parse(cached);
    } else {
      // If there is no cached data, fetch from API
      const response = await axios.get<TodosResponse>(API_URL);
      const todos = response.data.todos;

      // Save the fetched todos to localStorage
      localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));

      // Return the fetched todos
      return todos;
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
    // Return empty array instead of throwing
    return [];
  }
};

export const fetchTodoById = async (id: string | number): Promise<Todo | null> => {
  try {
    const cached = localStorage.getItem(LOCAL_KEY);
    if (cached) {
      const todos: Todo[] = JSON.parse(cached);
      const todo = todos.find((todo) => todo.id === Number(id));
      if (todo) return todo;
    }
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todo by id:', error);
    return null; // Return null on error
  }
};

export const createTodo = async ({ todo }: { todo: string }): Promise<Todo> => {
  const cached = localStorage.getItem("todos");
  const todos: Todo[] = cached ? JSON.parse(cached) : [];
  // Find the highest Id 
  let highestId = 0;
  for (let t of todos) {
    if (t.id > highestId) {
      highestId = t.id
    }
  }
  const newTodo: Todo = {
    id: highestId + 1, // Increment the highest ID
    todo,
    completed: false,
    userId: 1,
  };
  const updatedTodos = [newTodo, ...todos];
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  return newTodo;
};

export const updateTodo = async (updatedTodo: UpdateTodoParams): Promise<Todo | null> => {
  const cached = localStorage.getItem(LOCAL_KEY);
  const todos: Todo[] = cached ? JSON.parse(cached) : [];

  //Find the todo with the same id
  const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

  if (index !== -1) {
    // Replace the old todo with the updated one
    todos[index] = { ...todos[index], ...updatedTodo }
    // Save the updated todos back to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
    // Return the updated todo
    return todos[index];
  } else {
    return null;
  }
};

export const deleteTodo = async (id: number): Promise<Todo | null> => {
  const cached = localStorage.getItem(LOCAL_KEY);
  const todos: Todo[] = cached ? JSON.parse(cached) : [];
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
