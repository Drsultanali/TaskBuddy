'use client'
import { useState, ChangeEvent } from "react";
interface Task {
  text: string;
  favorite: boolean;
}
import { FaRegEdit } from "react-icons/fa";
import { RiChatDeleteFill } from "react-icons/ri";
import { MdFavorite } from "react-icons/md";
import { IoIosHeartDislike } from "react-icons/io";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, favorite: false }]);
      setNewTask("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index: number) => {
    setIsEditing(true);
    setCurrentTask(tasks[index].text);
    setCurrentIndex(index);
  };

  const handleUpdateTask = () => {
    if (currentIndex !== null && currentTask.trim() !== "") {
      const updatedTasks = tasks.map((task, index) =>
        index === currentIndex ? { ...task, text: currentTask } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setCurrentTask("");
      setCurrentIndex(null);
    }
  };

  const handleCurrentTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTask(e.target.value);
  };
  const handleFavoriteTask = (index: number) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, favorite: !task.favorite } : task
    );
    setTasks(updatedTasks);
  };
  const filteredTasks = showFavorites
    ? tasks.filter(task => task.favorite)
    : tasks;

  return (
    <>
      <div>
        <span className="flex justify-center text-2xl font-bold mt-20">TaskBuddy</span>
        <div className="flex justify-center mt-20 ">
          <input
            type="text"
            value={isEditing ? currentTask : newTask}
            onChange={isEditing ? handleCurrentTaskChange : handleInputChange}
            className="border w-1/2 pl-2"
            placeholder="Enter task description..."
          />
          <button
            onClick={isEditing ? handleUpdateTask : handleAddTask}
            className="bg-gradient-to-r from-yellow-200 via-red-500 to-indigo-500 text-white rounded-md px-4 py-2"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
        <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 text-white rounded-md px-4 py-2"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>
        <div className="border-2 rounded-xl border-white mt-5 shadow-2xl w-4/5 mx-auto">
          <div className="w-full flex flex-col mx-auto">
            {filteredTasks.map((task, index) => (
              <div key={index} className="flex flex-col md:flex-row md:justify-between p-2 md:items-center mt-2 border-2 rounded-md shadow-xl border-white my-4">
                <span className=" tracking-wide text-base md:w-1/2 w-full py-2">{task.text}</span>
                <div>
                  <button
                    onClick={() => handleEditTask(index)}
                    className="bg-yellow-500 text-white rounded-md px-4 py-2 mr-2"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="bg-red-600 text-white rounded-md px-4 py-2"
                  >
                    <RiChatDeleteFill />
                  </button>
                  <button
                onClick={() => handleFavoriteTask(index)}
                className={`${
                  task.favorite ? " bg-gray-500 ml-2 border" : "bg-green-500 ml-2"
                } text-white rounded-md px-4 py-2`}
              >
                {task.favorite ? <IoIosHeartDislike size={18} /> : <MdFavorite />}
              </button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </>
      );
}
