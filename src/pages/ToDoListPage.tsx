import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, fetchAllTodos, updateTodo, deleteTodo, type Todo } from "../api/todo";
import { useTodoStore } from "../store/useTodoStore";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ModeToggle } from "@/components/mode-toggle";

// Skeleton loader for header (just for loading effect)
function HeaderSkeleton() {
  return (
    <div className="flex items-center px-4 sm:px-8 py-8 sm:py-12 w-full max-w-3xl sm:max-w-4xl mx-auto dark:bg-transparent">
      <div className=" rounded-[1406.64px] w-[92px] h-[42px] bg-[#F6F6F9] sm:w-24 mr-2 sm:mr-4 animate-pulse" style={{ minWidth: "110px" }} />
      <div className="w-[986.01px] h-[4px] bg-[#F6F6F9]" />
    </div>
  );
}

// Skeleton loader for the todo list (shows while loading)
function TodoListSkeleton() {
  return (
    <section className="flex flex-col items-center justify-center mx-auto w-full">
      <HeaderSkeleton />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-full max-w-2xl sm:max-w-3xl h-[70px] sm:h-[85px] flex items-center gap-4 sm:gap-8 border rounded-[44px] px-4 sm:px-8 py-0 mb-4 bg-white shadow animate-pulse"
        >
          <div className="flex items-center gap-2 w-[50px] sm:w-[70px]">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#F6F6F9]" />
            <div className="w-6 h-3 sm:w-8 sm:h-4 rounded bg-[#F6F6F9]" />
          </div>
          <div className="flex-1 flex items-center min-w-0">
            <div className="h-4 sm:h-5 w-2/3 sm:w-3/4 rounded bg-[#F6F6F9]" />
          </div>
          <div className="w-[80px] sm:w-[120px] flex justify-center">
            <div className="h-7 sm:h-8 w-16 sm:w-20 rounded-[1406.64px] bg-[#F6F6F9]" />
          </div>
          <div className="w-[30px] sm:w-[40px] flex justify-center">
            <div className="h-5 sm:h-6 w-5 sm:w-6 rounded bg-[#F6F6F9]" />
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-[50px] sm:w-[70px] justify-end">
            <div className="h-5 sm:h-6 w-5 sm:w-6 rounded bg-[#F6F6F9]" />
            <div className="h-5 sm:h-6 w-5 sm:w-6 rounded bg-[#F6F6F9]" />
          </div>
        </div>
      ))}
    </section>
  );
}

// Main ToDoListPage component
const ToDoListPage = () => {
 
  // This is for showing the skeleton loader for 1 second
  useEffect(() => {
    const timer = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Getting state from zustand store
  const {
    page, setPage,
    searchTerm, setSearchTerm,
    newTodo, setNewTodo,
    showAddModal, setShowAddModal,
    filter, setFilter,
    editingId, setEditingId,
    editingText, setEditingText,
    modalInput, setModalInput,
    showSkeleton, setShowSkeleton,
  } = useTodoStore();

  // How many todos per page
  const limit = 10;
  const queryClient = useQueryClient();

  // Fetching all todos using react-query
  const {
    data: allTodos = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["all-todos"],
    queryFn: fetchAllTodos,
  });

  // Mutation for creating a todo
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-todos"] });
      setNewTodo("");
    },
  });

  // Mutation for updating a todo
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-todos"] });
    },
  });

  // Mutation for deleting a todo
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-todos"] });
    },
  });

  // Handler for submitting a new todo
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newTodo.trim()) {
      createMutation.mutate({ todo: newTodo });
    }
  };

  // Handler for search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  // Handler for updating a todo (also updates localStorage)
  const handleUpdate = (updatedTodo: Partial<Todo> & { id: number }) => {
    const todosFromStorage = JSON.parse(localStorage.getItem("todos") || "[]");
    const updatedTodos = todosFromStorage.map((todo: Todo) =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    queryClient.setQueryData(["all-todos"], updatedTodos);
  };

  // Filtering and paginating todos
  const filteredTodos = allTodos.filter(
    (todo: Todo) =>
      todo &&
      typeof todo.todo === "string" &&
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filter === "all" ||
        (filter === "completed" && todo.completed) ||
        (filter === "pending" && !todo.completed))
  );
  const totalPages = Math.ceil(filteredTodos.length / limit) || 1;
  const paginatedTodos = filteredTodos.slice((page - 1) * limit, page * limit);

  // Helper to truncate long todo text
  function truncateTodo(text: string) {
    const maxLength = 41;
    if (typeof text !== "string") return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  }

  const navigate = useNavigate();

  
  return (
    <>
    <section className="flex flex-col items-center justify-center mx-auto w-full min-h-screen">
      {/* Modal for adding a new todo */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] backdrop-blur-sm">
          <div className="bg-[#FEFEFB] dark:bg-[#1E1E1E] rounded-[44px] shadow-2xl p-6 sm:p-8 w-[90vw] max-w-md flex flex-col items-center border border-[#FDBF46] dark:border-[#53462b]">
            <img
              src="/assets/quill_todo.svg"
              alt="Add Todo"
              className="w-10 h-10 sm:w-12 sm:h-12 mb-3"
            />
            <h2 className="text-xl sm:text-2xl font-bold text-[#5B6097] mb-2">
              Add New Todo
            </h2>
            <p className="text-[#A3A3B9] mb-4 text-center text-sm sm:text-base">
              Write something you want to accomplish today!
            </p>
            <input
              type="text"
              value={modalInput}
              onChange={(e) => setModalInput(e.target.value)}
              className="w-full py-2 sm:py-3 px-3 sm:px-4 border border-[#A3A3B9] rounded-[49.41px] focus:outline-none focus:border-[#FDBF46] mb-4 text-[#5B6097] bg-[#FEFEFB] placeholder-[#A3A3B9] dark:bg-transparent dark:text-[#FEFEFB]"
              placeholder="Enter todo..."
              autoFocus
              maxLength={100}
            />
            <div className="flex gap-2 sm:gap-4 mt-2">
              <Button
                className="bg-green-500 hover:bg-green-600 text-white rounded-[1406.64px] w-[80px] sm:w-[92px] h-[38px] sm:h-[42px] font-semibold shadow"
                onClick={() => {
                  if (modalInput.trim()) {
                    createMutation.mutate({ todo: modalInput });
                    setModalInput("");
                    setShowAddModal(false);
                  }
                }}
              >
                Add
              </Button>
              <Button
                className="bg-gray-200 hover:bg-gray-300 text-[#5B6097] rounded-[1406.64px] w-[80px] sm:w-[92px] h-[38px] sm:h-[42px] font-semibold shadow"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header with filter buttons */}
      <div className="flex items-center px-4 -mt-6 sm:px-8 py-8 sm:py-12 w-full max-w-2xl sm:max-w-4xl">
        {filter === "all" && (
          <button
            className="all-button items-center flex z-10 flex-1 justify-center font-semibold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-[44px] cursor-default"
            style={{ minWidth: "110px" }}
          >
            all
          </button>
        )}
        {filter === "pending" && (
          <button
            className="pending-button items-center flex z-10 flex-1 justify-center font-semibold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-[44px] cursor-default"
            style={{ minWidth: "110px" }}
          >
            pending
          </button>
        )}
        {filter === "completed" && (
          <button
            className="completed-button items-center flex z-10 flex-1 justify-center font-semibold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 rounded-[44px] cursor-default"
            style={{ minWidth: "110px" }}
          >
            completed
          </button>
        )}
        <div className="line"></div>
      </div>

      {/* Show how many todos found if searching */}
      {searchTerm && (
        <p className="-mt-6 sm:-mt-8 mb-4 font-medium text-[#5B6097] text-sm sm:text-base">
          {filteredTodos.length} found out of {allTodos.length}{" "}
        </p>
      )}

      {/* Todo List */}
      <div
        className="w-full flex flex-col items-center"
        style={{ minHeight: "900px" }}
      >
        {/* Loop through todos and show each one */}
        {paginatedTodos.map((todo: Todo) =>(
          <div
            className="w-full max-w-2xl sm:max-w-3xl h-[70px] sm:h-[85px] flex items-center gap-4 sm:gap-8 border rounded-[44px] text-[#A3A3B9] px-4 sm:px-8 py-0 mb-4 bg-white dark:bg-[#1E1E1E]"
            key={todo.id}
          >
            {/* If editing, show input, else show todo */}
            
            {editingId === todo.id ? (
              <>
                {/* ID and circle */}
                <div className="flex items-center gap-2 w-[50px] sm:w-[70px]">
                  <img
                    src="assets/circle.svg"
                    alt=""
                    className="w-5 h-5 sm:w-6 sm:h-6 mt-2"
                  />
                  <p className="font-medium text-[15px] sm:text-[16px] mt-0.5">
                    {todo.id}
                  </p>
                </div>

                {/* Edit form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate({
                      id: todo.id,
                      todo: editingText,
                      completed: todo.completed,
                      userId: todo.userId,
                    });
                    setEditingId(null);
                  }}
                  className="flex gap-2 justify-center mt-1.5 flex-1"
                >
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="py-2 sm:py-3 px-2 sm:px-3 border border-[#A3A3B9] rounded-[49.41px] focus:outline-none w-full"
                    autoFocus
                  />

                  <button
                    type="submit"
                    className="text-[#FEFEFB] rounded-[1406.64px] w-[70px] sm:w-[92px] h-[38px] sm:h-[42px] bg-green-500 mt-1"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 text-[#FEFEFB] rounded-[1406.64px] w-[70px] sm:w-[92px] h-[38px] sm:h-[42px] mt-1"
                  >
                    Cancel
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* ID and circle */}
                <div className="flex items-center gap-2 w-[50px] sm:w-[70px]">
                  <img
                    src="assets/circle.svg"
                    alt=""
                    className="w-5 h-5 sm:w-6 sm:h-6 mt-2"
                  />
                  <p className="font-medium text-[15px] sm:text-[16px] mt-0.5">
                    {todo.id}
                  </p>
                </div>

                {/* Todo text */}
                <div className="flex-1 flex items-center min-w-0">
                  <p className="truncate text-[15px] sm:text-[16px] font-medium text-[#5B6097] ">
                    {truncateTodo(todo.todo) || "No description"}
                  </p>
                </div>

                {/* Status button */}
                <div className="w-[80px] sm:w-[120px] flex justify-center">
                  <Button
                    className={`w-[70px] sm:w-[100px] ${todo.completed ? "completed-button" : "pending-button"
                      }`}
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </Button>
                </div>

                {/* View icon */}
                <div className="w-[30px] sm:w-[40px] flex justify-center">
                  <Link to={`/todos/${todo.id}`} className="text-blue-500 hover:scale-115 duration-300 transition-transform">
                    <Icon
                      icon="mdi:eye-outline"
                      width="20"
                      height="20"
                      className="sm:w-6 sm:h-6"
                      style={{ color: "#00BFFF" }}
                    />
                  </Link>
                </div>

                {/* Edit and delete icons */}
                <div className="flex items-center gap-2 sm:gap-4 w-[50px] sm:w-[70px] justify-end">
                  <Icon
                    icon="mynaui:edit-one"
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6 cursor-pointer hover:scale-115 duration-300 transition-transform"
                    style={{ color: "#FDBF46" }}
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditingText(todo.todo);
                    }}
                  />

                  <img
                    src="assets/trash.svg"
                    alt=""
                    className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 hover:scale-115 duration-300 transition-transform"
                    onClick={() => deleteMutation.mutate(todo.id)}
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {/* Pagination controls */}
        <div className="flex justify-between mt-4 items-center w-full max-w-2xl sm:max-w-3xl mb-5 px-4 sm:px-0">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="completed-button disabled:opacity-50 text-sm sm:text-base"
          >
            Prev
          </button>
          <span className="text-[15px] sm:text-[16px] font-medium text-[#5B6097]">
            Page {page} of {totalPages} {isFetching && "(Fetching...)"}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="pending-button disabled:opacity-50 text-sm sm:text-base"
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex justify-center my-4">
      <Button
        className="bg-[#F2706D] hover:bg-red-600 text-white rounded-[44px] px-10 py-3 font-semibold shadow"
        onClick={() => navigate("/error-boundary")}
      >
        Open Error Boundary Page
      </Button>
    </div>

    </section>
    </>
  );
};

export default ToDoListPage;