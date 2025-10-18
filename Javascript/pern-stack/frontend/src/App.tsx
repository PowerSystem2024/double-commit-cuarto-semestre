import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { TasksPage } from "./pages/TasksPage";
import { LoginForm } from "./components/LoginForm";
import { RegisterPage } from "./pages/RegisterPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { UpdatePage } from "./pages/UpdatePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/tareas" element={<TasksPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/create-task" element={<CreateTaskPage />} />
      <Route path="/profile/edit" element={<UpdatePage />} />
    </Routes>
  );
}
