import { createContext, useContext, useState } from "react";

import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import TodoForm from "../TodoForm/TodoForm";

import { useTasks } from "../../context/TaskContext";
import { useAuth } from "../../context/authContext";

import "./Dashboard.css";
import Error from "../Error/Error";

const TodoBoardContext = createContext();

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);

  const { user } = useAuth();

  return (
    <TodoBoardContext.Provider
      value={{
        isFormOpen,
        setIsFormOpen,
        editingTask,
        setEditingTask,
        viewTask,
        setViewTask,
      }}
    >
      <div className="dashboard-container">
        <NavBar />
        <Welcome user={user} />
        <div className="dashboard-main">
          <TodoBoard />
        </div>

        <Footer />
        <TodoForm />
      </div>
    </TodoBoardContext.Provider>
  );
}

export function useTodoBoard() {
  return useContext(TodoBoardContext);
}

export function Welcome({ user }) {
  const firstName = user.name.split(" ")[0];

  return (
    <header className="dashboard-welcome">
      <h1 className="welcome-title">{`Welcome ${firstName}, to your TodoApp!`}</h1>
      <p className="welcome-desc">Let's get things done.</p>
    </header>
  );
}

export function TodoBoard() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  const totalTasks = tasks.length;

  return (
    <div className="todo-board-container">
      <div className="todo-board">
        <TodoBoardHeader completedTasks={completedTasks} totalTasks={totalTasks} />
        <TodoCardContainer />
      </div>
    </div>
  );
}

export function TodoCard({ task }) {
  const { deleteTask, updateTask } = useTasks();
  const { setIsFormOpen, setEditingTask, setViewTask } = useTodoBoard();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleDelete() {
    try {
      setDeleteLoading(true);
      setDeleteError("");
      await deleteTask(task._id);
    } catch (err) {
      console.error(err);
      setDeleteError(err.message || "Failed to delete todo");
    } finally {
      setDeleteLoading(false);
    }
  }

  function handleView() {
    setViewTask(task);
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function handleEdit() {
    setViewTask(null);
    setEditingTask(task);
    setIsFormOpen(true);
  }

  function handleComplete() {
    updateTask(task._id, {
      status: task.status === "completed" ? "pending" : "completed",
    });
  }

  return (
    <>
      <div
        className={`todo-card ${task.status === "completed" ? "completed-card" : ""}`}
        onClick={handleView}
      >
        <div className="todo-card-content">
          <input
            className="todo-checkbox"
            type="checkbox"
            checked={task.status === "completed"}
            onChange={handleComplete}
            onClick={(e) => e.stopPropagation()}
          />

          <span className={task.status === "completed" ? "completed-text" : ""}>{task.name}</span>
        </div>

        <div className="priority-box">
          <span className={task.priority.toLowerCase()}>{task.priority}</span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
            className="btn edit-btn"
          >
            ✎
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="btn delete-btn"
          >
            {deleteLoading ? "..." : "×"}
          </button>
        </div>
      </div>
      {deleteError && <Error message={deleteError} />}
    </>
  );
}

export function TodoCardContainer() {
  const { tasks } = useTasks();

  return (
    <section className="todo-card-container">
      {tasks.length > 0 && tasks.map((task) => <TodoCard task={task} key={task._id} />)}
    </section>
  );
}

export function TodoBoardHeader({ completedTasks, totalTasks }) {
  const { setIsFormOpen, setEditingTask, setViewTask } = useTodoBoard();

  function handleAddTask() {
    setEditingTask(null);
    setViewTask(null);
    setIsFormOpen(true);
  }

  return (
    <header className="todo-board-header">
      <p className="header-title">My Todos</p>

      <div>
        <span className="task-done-count">
          {completedTasks} of {totalTasks} done
        </span>
      </div>

      <div>
        <button onClick={handleAddTask} className="btn add-task-btn">
          Add Todo
        </button>
      </div>
    </header>
  );
}
