import { Toaster, toast } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./features/notFound/pages/NotFound.jsx";
import DashboardPage from "@/features/todo/pages/DashboardPage.jsx";
import LoginPage from "@/features/auth/pages/LoginPage.jsx";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
