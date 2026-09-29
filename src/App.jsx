import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { initialTasks, STORAGE_KEY } from "./data";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore corrupt storage, fall back to seed data
  }
  return initialTasks;
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage unavailable (private mode, quota) — app still works in-memory
    }
  }, [tasks]);

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (title, description, status) => {
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID?.() ?? `task-${Date.now()}`,
        title,
        description,
        status,
      },
    ]);
  };

  const updateTask = (id, title, description) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  const updateTaskStatus = (id, status) => {
    if (id == null) return;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <MainContent
        tasks={tasks}
        search={search}
        setSearch={setSearch}
        deleteTask={deleteTask}
        addTask={addTask}
        updateTask={updateTask}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
}
