import { useMemo, useRef } from "react";
import { BoardColumn } from "./BoardColumn";
import { boardColumns } from "../data";

export function MainContent({
  tasks,
  search,
  setSearch,
  deleteTask,
  addTask,
  updateTask,
  updateTaskStatus,
}) {
  const draggedTaskId = useRef(null);

  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        task.description.toLowerCase().includes(q)
    );
  }, [tasks, search]);

  const tasksByStatus = (status) =>
    filteredTasks.filter((task) => task.status === status);

  return (
    <main className="main-content">
      <header className="topbar">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search a task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              className="clear-search-btn"
              aria-label="Clear search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>
        <div className="user-profile">
          <div className="avatar-group">
            <div className="avatar"></div>
            <div className="avatar"></div>
            <div className="avatar"></div>
          </div>
        </div>
      </header>

      <div className="project-header">
        <h1>NovaBoard Mobile App</h1>
        <div className="project-meta">
          <span className="meta-item">
            Client: <strong>Arcadia Solutions</strong>
          </span>
          <span className="meta-dot">•</span>
          <span className="meta-item menu-item-second">
            Timeline: <strong>May 20 - June 30, 2025</strong>
          </span>
          <span className="status-pill">In Progress</span>
        </div>
      </div>

      <section className="board-container" id="board">
        {boardColumns.map((board) => (
          <BoardColumn
            key={board.value}
            data={board}
            tasks={tasksByStatus(board.value)}
            deleteTask={deleteTask}
            addTask={addTask}
            updateTask={updateTask}
            updateTaskStatus={updateTaskStatus}
            draggedTaskId={draggedTaskId}
          />
        ))}
      </section>
    </main>
  );
}
