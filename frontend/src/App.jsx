import { Toaster, toast } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./features/notFound/pages/NotFound.jsx";
import TodoPage from "./features/todo/pages/todoPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
