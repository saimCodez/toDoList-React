import {
  ArrowDownAZ,
  ClipboardCheckIcon,
} from "lucide-react";
import { useRef, useState } from "react";

import { TodoItem } from "./toDoItem";
import type { Task } from "../types";

const generateId = () => crypto.randomUUID(); // Or use Date.now().toString() for simpler ID

export const ToDoList = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  //  task    updatetask
  const toDoKey = "reactTodo";
  const [tasks, setTasks] = useState<Task[]>(() => {
    const rawTodos = localStorage.getItem(toDoKey);

    if (rawTodos) return JSON.parse(rawTodos);

    // Default todos with random IDs
    return [
      { id: generateId(), text: "Eat breakfast" },
      { id: generateId(), text: "Take shower" },
      { id: generateId(), text: "Go to school" },
    ];
  });
  // taskInput  updateTaskInput
  const [inputTask, setinputTask] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [movingIndex, setMovingIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<Task | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputTask(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editValue) return;

    // Update the text inside the Task object
    setEditValue({ ...editValue, text: e.target.value });
  };

  const addTask = () => {
    const generateId = () => crypto.randomUUID(); // Or use Date.now().toString() for simpler ID

    if (inputTask.trim() !== "") {
      setTasks((prev) => [...prev, { id: generateId(), text: inputTask }]);
      setinputTask("");
      // 👆 means that the value of input which we added as task became empty when we enter so it will become as a task and the taskwhich we typed in input value got empty
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100); // wait for DOM update
    }
  };

  localStorage.setItem(toDoKey, JSON.stringify(tasks));

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
        setMovingIndex(0);
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
        setMovingIndex(0);
        setDirection(null);
      }, 200);
    }
  };

  const SortTodos = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSort(value);
    const sorted = [...tasks].sort((a, b) =>
      value === "asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text)
    );
    setTasks(sorted);
  };

  const startEdit = (index: number) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = (index: number) => {
    const updated = [...tasks];
    if(editValue?.text == ""){
      alert("Please enter the value")
      return 
    }
    updated[index] = editValue || updated[index];
    setTasks(updated);
    setEditingIndex(null);
    setEditValue({ id: "", text: "" });
  };

  const deleteAll = () => {
    setTasks([]);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-[#ff7777] via-[#ff4545] to-blue-800">
        <div className="bg-white w-[600px] h-[600px] rounded-lg shadow-[10px_10px_20px_rgba(0,0,0,0.3)] overflow-auto">
          <div className="sticky top-0 bg-white z-50">
            <div className="flex justify-between items-center px-6 pt-10 pb-2">
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
            <div className="flex items-center relative mt-5 pb-3.5 mx-6">
              <input
                type="text"
                className="pl-6 py-3 bg-gray-200 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-950"
                placeholder="Add your task"
                value={inputTask}
                onChange={handleInputChange}
              />
              <button
                className="absolute right-0 cursor-pointer rounded-full px-10 py-3 bg-[#FF5B5B] text-white font-semibold hover:bg-[#ff8282] active:bg-[#FF5B5B]"
                onClick={addTask}
              >
                ADD
              </button>
            </div>
            <div className="flex justify-between text-center mx-10 pb-3.5">
              <div className="text-sm font-semibold">
                <span className="font-normal">Todos Added:</span> {tasks.length}
              </div>
              <button
                className=" text-red-500 font-semibold text-sm text-center rounded-full cursor-pointer hover:underline"
                onClick={() => deleteAll()}
              >
                Delete All
              </button>
            </div>
          </div>

          <div className="px-6 pb-4">
            <ol>
              {tasks.map((task, index) => (
                <TodoItem
                  task={task}
                  options={{
                    direction,
                    index,
                    movingIndex,
                    editingIndex,
                    editValue,
                    handleEditChange,
                    saveEdit,
                    moveTaskUp,
                    moveTaskDown,
                    startEdit,
                    deleteTask,
                  }}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </form>
  );
};
