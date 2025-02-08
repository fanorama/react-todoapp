import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { Trash2, Plus, Check } from "lucide-react";
import { toast } from "sonner";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) {
      toast.error("Please enter a task");
      return;
    }
    setTasks([
      ...tasks,
      { id: Date.now(), title: newTodo.trim(), completed: false },
    ]);
    setNewTodo("");
    toast.success("Task added");
  };
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted");
  };

  const listTasks = tasks.map((task) => (
    <li className="flex gap-2" key={task.id}>
      <input
        type="checkbox"
        name="done"
        id="done1"
        onChange={() => handleToggleTask(task.id)}
      />
      <div>
        {task.title} {task.completed}
      </div>
      <button
        className="ml-auto cursor-pointer"
        onClick={() => handleDeleteTask(task.id)}
      >
        x
      </button>
    </li>
  ));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-4xl font-bold">Welcome!</h1>
            <span className="text-xl">
              {tasks.filter((task) => !task.completed).length} tasks remaining
            </span>
          </div>
          <div className="mb-8">
            {/* Input task */}
            <form
              onSubmit={handleAddTask}
              className="flex w-full flex-col gap-4"
            >
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-200 bg-white/80 px-4 py-3 text-lg shadow-sm backdrop-blur-sm transition-all duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-2 transition-colors duration-200 hover:bg-gray-100"
                >
                  <Plus className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
            {/* List task */}
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  className="group flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-1 items-center gap-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200 ${
                        task.completed
                          ? "border-purple-500 bg-purple-500"
                          : "border-gray-300 hover:border-purple-500"
                      }`}
                    >
                      {task.completed && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                    <span
                      className={`flex-1 text-gray-800 transition-all duration-200 ${task.completed ? "text-gray-400 line-through" : ""}`}
                    >
                      {task.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="cursor-pointer rounded-md p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
