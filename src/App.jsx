import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes/AppRoutes"; // Fixed import path
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
    </QueryClientProvider>
  );
}

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import TodoListPage from "./pages/TodoListPage.jsx";
// import TodoDetailPage from "./pages/TodoDetailPage.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Header from "./components/Header.jsx";

// const queryClient = new QueryClient();

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <TodoListPage />,
//   },
//   {
//     path: "/todos/:id",
//     element: <TodoDetailPage />,
//   }
// ]);

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Navbar />
//       <Header />
//       <RouterProvider router={router} />
      
//     </QueryClientProvider>
//   );
// }
