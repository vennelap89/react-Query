import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Table from "./pages/Table";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 2 * 60 * 1000, // 2 minutes
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route path="/table" element={<Table />} />
            <Route path="/" element={<Navigate to={"/table"} />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
