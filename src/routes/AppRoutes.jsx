import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ToDoListPage from "../pages/ToDoListPage";
import TodoDetailPage from "../pages/TodoDetailPage";
import ErrorFallback from "@/components/ErrorFallback";
import NotFoundPage from "@/pages/NotFoundPage";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ToDoListPage />,
        // errorElement: <ErrorBoundary />,
      },
      {
        path: "/todos/:id",
        element: <TodoDetailPage />,
        errorElement: <ErrorFallback />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;