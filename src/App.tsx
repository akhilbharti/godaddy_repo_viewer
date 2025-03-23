
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./hooks/use-theme";
import LoadingState from "./components/LoadingState";

// Lazy load components for better performance
const RepoList = lazy(() => import("./pages/RepoList"));
const RepoView = lazy(() => import("./pages/RepoView"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Create a new QueryClient instance with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      gcTime: 1000 * 60 * 30, // 30 minutes (replacing cacheTime)
    },
  },
});

// Wrap the App component in a function declaration to ensure React hooks work properly
function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<div className="container mx-auto px-4 py-8"><LoadingState type="list" /></div>}>
              <Routes>
                <Route path="/" element={<RepoList />} />
                <Route path="/index" element={<Navigate to="/" replace />} />
                <Route path="/repo/:repoName" element={<RepoView />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
