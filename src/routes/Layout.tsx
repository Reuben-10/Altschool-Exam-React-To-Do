import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/theme-provider";

const Layout = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/todos/");
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ErrorBoundary>
          <div className="bg-[#FEFEFB] dark:bg-[#1E1E1E] ">
            <Navbar />
            {!isDetailPage && <Header />}
            <Outlet />
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </div>
  );
};

export default Layout;