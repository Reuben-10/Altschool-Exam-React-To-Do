import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/useTodoStore";

// TodoDetailPage component
const TodoDetailPage = () => {

  const {
    isEditing, setIsEditing,
    editingDescription, setEditingDescription,
    status, setStatus,
    loading, setLoading,
  } = useTodoStore();

  // Get the todo id from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const todoId = Number(id);

  // State variables
  const [todo, setTodo] = useState(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  // const [editingDescription, setEditingDescription] = useState("");
  // const [status, setStatus] = useState(false);
  // const [loading, setLoading] = useState(true);

  // Load todo from localStorage and set loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
      // Find the todo with the matching id
      const foundTodo = storedTodos.find((t) => t.id === todoId);

      // If todo doesn't have a createdAt, add it now
      if (foundTodo && !foundTodo.createdAt) {
        foundTodo.createdAt = new Date().toISOString();
        // Update localStorage with the new createdAt
        const updatedTodos = storedTodos.map((t) =>
          t.id === todoId ? foundTodo : t
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
      }

      setTodo(foundTodo);
      if (foundTodo) {
        setStatus(foundTodo.completed);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [todoId]);

  // Save edited todo
  const handleSave = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = storedTodos.map((t) =>
      t.id === todoId
        ? { ...t, todo: editingText, description: editingDescription }
        : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodo({ ...todo, todo: editingText, description: editingDescription });
    setIsEditing(false);
  };

  // Change todo status (completed/pending)
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = storedTodos.map((t) =>
      t.id === todoId ? { ...t, completed: newStatus } : t
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodo({ ...todo, completed: newStatus });
  };

  // Delete todo
  const handleDelete = () => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = storedTodos.filter((t) => t.id !== todoId);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    navigate("/");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Show loading skeleton while loading
  if (loading) {
    return (
      <main className="w-full max-w-lg mx-auto p-4 sm:p-8 bg-white rounded-3xl shadow-lg border border-gray-200 mt-6 sm:mt-12 flex flex-col items-center">
        <div className="w-full flex flex-col items-center p-4 sm:p-8">
          <Skeleton className="w-16 h-16 mb-4 rounded-full" />
          <Skeleton className="h-8 w-2/3 mb-4 rounded-xl" />
          <Skeleton className="h-6 w-1/2 mb-2 rounded-xl" />
          <Skeleton className="h-5 w-1/3 mb-6 rounded-xl" />
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-6">
            <Skeleton className="h-8 w-24 rounded-xl" />
            <Skeleton className="h-8 w-24 rounded-xl" />
          </div>
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </main>
    );
  }

  // Show message if todo not found
  if (!todo) {
    return (
      <main className="w-full max-w-lg mx-auto p-4 sm:p-8 bg-white rounded-3xl shadow-lg border border-gray-200 mt-6 sm:mt-12 flex flex-col items-center">
        <div className="text-gray-500 text-center">Todo not found.</div>
      </main>
    );
  }

  // Main render
  return (
    <main className="w-full max-w-lg mx-auto p-4 sm:p-8 bg-white rounded-3xl shadow-lg border border-gray-200 mt-6 sm:mt-12">
      {/* Header with title and back link */}
      <header className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">Todo Details</h2>
        <Link to="/" className="text-base text-blue-600 hover:underline font-medium">
          ← Back
        </Link>
      </header>

      {/* Todo details section */}
      <section className="p-4 sm:p-6 bg-gray-50 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-6 sm:gap-8">
        {/* If editing, show form */}
        {isEditing ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
            className="flex flex-col gap-4 sm:gap-6 w-full max-w-md items-center"
          >
            <input
              value={editingText}
              onChange={e => setEditingText(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 w-full text-gray-800 bg-white placeholder-gray-400 text-base sm:text-lg shadow-sm"
              autoFocus
              maxLength={100}
              required
              placeholder="Edit your todo..."
            />
            <textarea
              value={editingDescription}
              onChange={e => setEditingDescription(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-400 w-full text-gray-800 bg-white placeholder-gray-400 text-sm sm:text-base shadow-sm resize-none"
              rows={3}
              maxLength={300}
              placeholder="Edit description (optional)..."
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-2 font-semibold shadow"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full px-6 py-2 font-semibold shadow"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          // If not editing, show todo details
          <>
            <div className="flex flex-col items-center gap-2 w-full">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center break-words max-w-full">{todo.todo}</h3>
              {todo.description && (
                <p className="text-sm sm:text-base text-gray-600 text-center mt-2 break-words max-w-full">{todo.description}</p>
              )}
              <span className="text-xs text-gray-400 mt-1">
                {/* Show created date or fallback */}
                Added: {todo.createdAt && !isNaN(new Date(todo.createdAt)) ? formatDate(todo.createdAt) : "Date not available"}
              </span>
            </div>
            {/* Status buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full justify-center">
              <Button
                className={`rounded-full px-5 py-2 font-medium shadow transition ${status
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                  }`}
                onClick={() => handleStatusChange(true)}
                disabled={status}
              >
                Completed
              </Button>
              <Button
                className={`rounded-full px-5 py-2 font-medium shadow transition ${!status
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-200 text-gray-700"
                  }`}
                onClick={() => handleStatusChange(false)}
                disabled={!status}
              >
                Pending
              </Button>
            </div>
            {/* Edit and Delete buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full justify-center">
              <Button
                onClick={() => {
                  setIsEditing(true);
                  setEditingText(todo.todo);
                  setEditingDescription(todo.description || "");
                }}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold text-base sm:text-lg shadow transition"
              >
                Edit Todo
              </Button>
              <Button
                onClick={handleDelete}
                className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold text-base sm:text-lg shadow transition"
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default TodoDetailPage;
