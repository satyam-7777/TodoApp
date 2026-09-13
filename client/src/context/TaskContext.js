import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";

const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, loading: authLoading } = useAuth();

  async function fetchTasks() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/v1/tasks", {
        credentials: "include",
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to fetch tasks");
      }

      setTasks(resData.data.tasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(taskData) {
    try {
      setLoading(true);

      const response = await fetch("/api/v1/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Failed to add task");
      }

      setTasks((prevTasks) => [...prevTasks, resData.data.task]);

      return resData.data.task;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function updateTask(id, taskData) {
    try {
      setLoading(true);

      const response = await fetch(`/api/v1/tasks/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update task");
      }

      setTasks((prevTasks) => prevTasks.map((task) => (task._id === id ? data.task : task)));

      return data.task;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function deleteTask(id) {
    try {
      setLoading(true);

      const response = await fetch(`/api/v1/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task");
      }

      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    fetchTasks();
  }, [user, authLoading]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
