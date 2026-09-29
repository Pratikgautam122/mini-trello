import { useEffect, useState } from "react";
import { TaskCard } from "./TaskCard";

const emptyForm = { title: "", description: "" };

export function BoardColumn({
  data,
  tasks,
  deleteTask,
  addTask,
  updateTask,
  updateTaskStatus,
  draggedTaskId,
}) {
  const [isFormActive, setFormActive] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [isDragover, setDragover] = useState(false);

  const handleDragover = (e) => {
    e.preventDefault();
    setDragover(true);
  };
  const handleDragleave = () => setDragover(false);
  const handleDragend = () => setDragover(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragover(false);
    updateTaskStatus(draggedTaskId.current, data.value);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormActive(true);
  };

  const openEditForm = (task) => {
    setEditingId(task.id);
    setForm({ title: task.title, description: task.description });
    setFormActive(true);
  };

  const closeForm = () => {
    setFormActive(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editingId) {
      updateTask(editingId, form.title.trim(), form.description.trim());
    } else {
      addTask(form.title.trim(), form.description.trim(), data.value);
    }
    closeForm();
  };

  // Escape key cancels the open form
  useEffect(() => {
    if (!isFormActive) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeForm();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isFormActive]);

  return (
    <div className={`board-column col-${data.value}`}>
      <div className="board-header">
        <div className="header-left">
          <span className={`dot dot-${data.value}`}></span>
          <h2>{data.label}</h2>
          <span className="task-count">{tasks.length}</span>
        </div>
        <button className="more-btn" aria-label="Column options">
          •••
        </button>
      </div>

      <div
        className={`task-list ${isDragover ? "drop-target" : ""}`}
        onDragOver={handleDragover}
        onDragLeave={handleDragleave}
        onDragEnd={handleDragend}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              draggedTaskId={draggedTaskId}
              onEdit={openEditForm}
            />
          ))
        )}
      </div>

      {!isFormActive ? (
        <button className="add-task-btn" onClick={openAddForm}>
          + Add Task
        </button>
      ) : (
        <form className="inline-task-form" onSubmit={handleSave}>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task title..."
            required
            autoFocus
          />
          <textarea
            name="description"
            rows="2"
            placeholder="Task description..."
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, description: e.target.value }))
            }
          ></textarea>
          <div className="form-actions">
            <button type="submit" className="btn-save">
              {editingId ? "Update" : "Save"}
            </button>
            <button
              type="button"
              className="btn-cancel cancel-task-btn"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
