import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import Tooltip from "./ToolTip";
import { motion } from "framer-motion";
import type { Task } from "../types";

interface TodoItemProps {
  task: Task;
  options: {
    movingIndex: number;
    index: number;
    direction: "up" | "down" | null;
    editingIndex: number | null;
    editValue: Task | null;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveEdit: (index: number) => void;
    moveTaskUp: (index: number) => void;
    moveTaskDown: (index: number) => void;
    startEdit: (index: number) => void;
    deleteTask: (index: number) => void;
  };
}

export const TodoItem = ({
  task,
  options: {
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
  },
}: TodoItemProps) => {
  return (
    <div>
      <motion.li
        key={task.id}
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
              value={editValue?.text}
              onChange={handleEditChange}
              onBlur={() => saveEdit(index)}
              onKeyDown={(e) => e.key === "Enter" && saveEdit(index)}
              autoFocus
              className="outline-none"
            />
          ) : (
            <span className="text-gray-600 break-words max-w-full">
              {task.text}
            </span>
          )}
          <div className="flex gap-3">
            <button onClick={() => moveTaskUp(index)}>
              <ArrowUp className="text-gray-500 cursor-pointer" size={21} />
            </button>
            <button onClick={() => moveTaskDown(index)}>
              <ArrowDown className="text-gray-500 cursor-pointer" size={21} />
            </button>
            <Tooltip text="Edit">
              <button onClick={() => startEdit(index)}>
                <Pencil className="text-gray-500 cursor-pointer" size={21} />
              </button>
            </Tooltip>
            <Tooltip text="Delete">
              <button onClick={() => deleteTask(index)}>
                <Trash2 className="text-gray-500 cursor-pointer" size={21} />
              </button>
            </Tooltip>
          </div>
        </div>
        {/* <div ref={bottomRef} /> */}
      </motion.li>
    </div>
  );
};
