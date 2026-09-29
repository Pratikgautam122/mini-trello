const STATUS_LABELS = {
  todo: "To Do",
  "in-progress": "In Progress",
  done: "Done",
};

export function TaskCard({ task, deleteTask, draggedTaskId, onEdit }) {
  const handleDrag = () => {
    draggedTaskId.current = task.id;
  };
  const handleDragEnd = () => {
    draggedTaskId.current = null;
  };

  return (
    <div
      className="task-card"
      draggable="true"
      onDragStart={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className="task-card-top">
        <p className="task-title">{task.title}</p>
        <button
          type="button"
          className="edit-task-btn"
          aria-label="Edit task"
          onClick={() => onEdit(task)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </button>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-card-footer">
        <span
          className={`status-badge status-${task.status}`}
          aria-label={`Status: ${STATUS_LABELS[task.status] ?? task.status}`}
        >
          {STATUS_LABELS[task.status] ?? task.status}
        </span>
        <button
          type="button"
          className="delete-task-btn"
          aria-label="Delete task"
          onClick={() => deleteTask(task.id)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h2v9H7V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
