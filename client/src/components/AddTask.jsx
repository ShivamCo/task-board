import { useContext, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddTaskCardContext } from "../AddTaskContext";

const HttmlURL = "https://task-board-bxos.onrender.com/api/";

const AddTask = () => {
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: '/', maxAge: 60 * 60 * 24 });
  const { addTaskCard, closeTaskCard, taskCardData } = useContext(AddTaskCardContext);

  const [taskDetails, setTaskDetails] = useState({
    status: taskCardData?.status || "Pending",
    title: taskCardData?.title || "",
    description: taskCardData?.description || "",
    priority: taskCardData?.priority || "P0",
    team: taskCardData?.team || "",
    person: cookies.get('token'),
    assignee: taskCardData?.assignee || ""
  });

  const handleChange = (event) => {
    setTaskDetails({ ...taskDetails, [event.target.name]: event.target.value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(HttmlURL + "update-task", {
        userId: cookies.get('token'),
        taskId: taskCardData._id,
        ...taskDetails
      });
      toast.success(response.data);
      navigate(0);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(HttmlURL + "add-task", taskDetails);
      toast.success(response.data);
      navigate(0);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className={`flex ${addTaskCard ? "visible" : "invisible"} justify-center`}>
      <ToastContainer />
      <form className="fixed z-20 rounded-xl bg-white shadow-lg">
        <button onClick={closeTaskCard} className="absolute right-0 m-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 text-red-400 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>

        <div className="flex flex-col p-4 w-96 h-96">
          <h2 className="text-center font-medium text-2xl text-sky-700">{taskCardData?.title ? "Edit Task" : "Add Task"}</h2>

          <label className="text-sky-800 font-medium">Title</label>
          <input value={taskDetails.title} onChange={handleChange} className="bg-slate-50 p-1 rounded-lg pl-2 my-2" type="text" name="title" placeholder="Task Title..." />

          <label className="text-sky-800 font-medium">Description</label>
          <textarea value={taskDetails.description} onChange={handleChange} className="bg-slate-50 p-1 rounded-lg pl-2 my-2" name="description" placeholder="Task Description..." />

          <label className="text-sky-800 font-medium">Team</label>
          <select value={taskDetails.team} onChange={handleChange} className="my-1 bg-slate-50 p-1" name="team">
            <option value="Purchasing">Purchasing</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Accounting">Accounting</option>
            <option value="Finance">Finance</option>
            <option value="I.T.">I.T.</option>
          </select>

          <label className="text-sky-800 font-medium">Assignee</label>
          <input value={taskDetails.assignee} onChange={handleChange} className="bg-slate-50 p-1 rounded-lg pl-2 my-2" type="text" name="assignee" placeholder="Assignee" />
        </div>

        <div className="flex justify-between p-4">
          <div className="flex flex-col">
            <label className="text-sky-800 font-medium">Priority</label>
            <select value={taskDetails.priority} onChange={handleChange} name="priority">
              <option value="P0">Priority 0</option>
              <option value="P1">Priority 1</option>
              <option value="P2">Priority 2</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sky-800 font-medium">Status</label>
            <select value={taskDetails.status} onChange={handleChange} name="status">
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Deployed">Deployed</option>
              <option value="Deferred">Deferred</option>
            </select>
          </div>
        </div>

        <div className="p-2">
          {taskCardData?.title ? (
            <button onClick={handleUpdate} className="bg-sky-400 w-full p-2 rounded-full text-white font-semibold">Update</button>
          ) : (
            <button onClick={handleSubmit} className="bg-sky-400 w-full p-2 rounded-full text-white font-semibold">Add Task</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTask;
