import { useState } from "react";
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowUp,
  ClipboardCheckIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";
import Tooltip from "./ToolTip";

export const ToDoList = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //  task    updatetask
  const [tasks, setTasks] = useState<string[]>([
    "Eat breakfast",
    "take shower",
    "Go to school",
  ]);
  // taskInput  updateTaskInput
  const [newTask, setNewTask] = useState<string>("");

  const [sort, setSort] = useState<string>("");
  const [movingIndex, setMovingIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prev) => [...prev, newTask]);
      setNewTask("");
      // 👆 means that the value of input which we added as task became empty when we enter so it will become as a task and the taskwhich we typed in input value got empty
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // wait for DOM update
    }
  };

  const deleteTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const moveTaskUp = (index: number) => {
    if (index > 0) {
      setMovingIndex(index);
      setDirection("up");
      setTimeout(() => {
        const updated = [...tasks];
        [updated[index], updated[index - 1]] = [
          updated[index - 1],
          updated[index],
        ];
        setTasks(updated);
        setMovingIndex(null);
        setDirection(null);
      }, 200);
    }
  };

  const moveTaskDown = (index: number) => {
    if (index < tasks.length - 1) {
      setMovingIndex(index);
      setDirection("down");
      setTimeout(() => {
        const updated = [...tasks];
        [updated[index], updated[index + 1]] = [
          updated[index + 1],
          updated[index],
        ];
        setTasks(updated);
        setMovingIndex(null);
        setDirection(null);
      }, 200);
    }
  };

  const SortTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    const sorted = [...tasks].sort((a, b) =>
      value === "asc" ? a.localeCompare(b) : b.localeCompare(a)
    );
    setTasks(sorted);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = (index: number) => {
    const updated = [...tasks];
    updated[index] = editValue.trim() || updated[index];
    setTasks(updated);
    setEditingIndex(null);
    setEditValue("");
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-[#ff7777] via-[#ff4545] to-blue-800">
        <div className="bg-white w-[500px] h-[500px] rounded-lg shadow-[10px_10px_20px_rgba(0,0,0,0.3)] overflow-auto">
          <div className="sticky top-0 bg-white z-50">
            <div className="flex justify-between items-center px-6 pt-10">
              <div className="flex items-center gap-2">
                <ClipboardCheckIcon color="darkblue" size={30} />
                <h1 className="text-3xl font-bold text-blue-900">To-Do List</h1>
              </div>
              <div className="relative inline-block">
                <select
                  id="sort"
                  value={sort}
                  onChange={SortTodos}
                  className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 text-sm rounded-full shadow-sm text-gray-600 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF5B5B] focus:border-[#FF5B5B] hover:border-[#FF5B5B] transition-all cursor-pointer"
                >
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                <label
                  htmlFor="sort"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#FF5B5B] transition-colors"
                >
                  <ArrowDownAZ size={18} />
                </label>
              </div>
            </div>
            <div className="flex items-center relative mt-5 pb-7 mx-6">
              <input
                type="text"
                className="pl-6 py-3 bg-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Add your task"
                value={newTask}
                onChange={handleInputChange}
              />
              <button
                className="absolute right-0 cursor-pointer rounded-full px-10 py-3 bg-[#FF5B5B] text-white font-semibold hover:bg-[#ff8282] active:bg-[#FF5B5B]"
                onClick={addTask}
              >
                ADD
              </button>
            </div>
          </div>

          <div className="px-6 pb-4">
            <ol>
              {tasks.map((task, index) => (
                <motion.li
                  key={task + index}
                  layout
                  animate={{
                    y:
                      movingIndex === index
                        ? direction === "up"
                          ? -20
                          : direction === "down"
                          ? 20
                          : 0
                        : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  <div className="flex items-center justify-between flex-wrap bg-gray-200 rounded-full w-full py-2 px-6">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={() => saveEdit(index)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
                        autoFocus
                        className="flex-grow bg-white text-gray-800 px-3 py-1 rounded-full focus:outline-none mr-4"
                      />
                    ) : (
                      <span className="text-gray-600 break-words max-w-full">
                        {task}
                      </span>
                    )}
                    <div className="flex gap-3">
                      <button onClick={() => moveTaskUp(index)}>
                        <ArrowUp
                          className="text-gray-500 cursor-pointer"
                          size={21}
                        />
                      </button>
                      <button onClick={() => moveTaskDown(index)}>
                        <ArrowDown
                          className="text-gray-500 cursor-pointer"
                          size={21}
                        />
                      </button>
                      <Tooltip text="Edit">
                        <button onClick={() => startEdit(index)}>
                          <Pencil
                            className="text-gray-500 cursor-pointer"
                            size={21}
                          />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete">
                        <button onClick={() => deleteTask(index)}>
                          <Trash2
                            className="text-gray-500 cursor-pointer"
                            size={21}
                          />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  <div ref={bottomRef} />
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </form>
  );
};
