import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { TasksPage } from "./components/TasksPage";
import { LoginForm } from "./components/LoginForm";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/tareas" element={<TasksPage />} />
    </Routes>
  )
}