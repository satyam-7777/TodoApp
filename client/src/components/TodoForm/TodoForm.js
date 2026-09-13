import { useEffect, useState } from "react";
import "./TodoForm.css";
import { useTasks } from "../../context/TaskContext";
import { useTodoBoard } from "../Dashboard/Dashboard";
import Error from "../Error/Error";

const taskInitialState = {
  name: "",
  description: "",
  priority: "Low",
};

export default function TodoForm() {
  const [newTask, setNewTask] = useState(taskInitialState);
  const [error, setError] = useState("");

  const { addTask, updateTask, loading } = useTasks();

  const { isFormOpen, setIsFormOpen, editingTask, viewTask, setViewTask, setEditingTask } =
    useTodoBoard();

  useEffect(() => {
    const task = editingTask || viewTask;

    if (task) {
      setNewTask({
        name: task.name,
        description: task.description || "",
        priority: task.priority,
      });
    } else {
      setNewTask(taskInitialState);
    }
  }, [editingTask, viewTask]);

  function handleOnCancel() {
    setIsFormOpen(false);
    setViewTask(null);
    setEditingTask(null);
    setNewTask(taskInitialState);
    setError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));

    setError("");
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      if (editingTask) {
        await updateTask(editingTask._id, newTask);
      } else {
        await addTask(newTask);
      }

      setNewTask(taskInitialState);
      setEditingTask(null);
      setViewTask(null);
      setIsFormOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save task");
    }
  }

  if (!isFormOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleOnCancel}>
      <div className="todo-form" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="todo-form-close-btn"
          onClick={handleOnCancel}
          disabled={loading}
        >
          &times;
        </button>

        {error && <Error message={error} />}

        <form className="todo-card-form" onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label htmlFor="name">Todo Name *</label>

            <input
              onChange={handleChange}
              value={newTask.name}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your todo"
              minLength={3}
              required
              disabled={viewTask !== null || loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              onChange={handleChange}
              value={newTask.description}
              id="description"
              name="description"
              placeholder="Describe your todo..."
              rows="4"
              minLength={3}
              disabled={viewTask !== null || loading}
            />
          </div>

          <div className="form-group priority-form">
            <label htmlFor="priority">Priority *</label>

            <select
              onChange={handleChange}
              value={newTask.priority}
              id="priority"
              name="priority"
              required
              disabled={viewTask !== null || loading}
            >
              <option value="" disabled>
                Select priority
              </option>

              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn todo-cancel-btn"
              onClick={handleOnCancel}
              disabled={loading}
            >
              {viewTask ? "Close" : "Cancel"}
            </button>

            {!viewTask && (
              <button type="submit" className="btn todo-submit-btn" disabled={loading}>
                {loading
                  ? editingTask
                    ? "Updating..."
                    : "Adding..."
                  : editingTask
                    ? "Update"
                    : "Add"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
