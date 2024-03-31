import { useContext, useState } from "react"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddTaskCardContext, AddTaskCardProvider } from "../AddTaskContext";

const HttmlURL = "http://localhost:4000/api/"



const AddTask = (props) => {

    const navigate = useNavigate()
    const cookies = new Cookies(null, { path: '/', maxAge: 60 * 60 * 24 });

    const { addTaskCard } = useContext(AddTaskCardContext)
    const { openTaskCard, closeTaskCard, taskCardData, updateCardData } = useContext(AddTaskCardContext)

    const [taskDetails, setTaskDetails] = useState({
        status: "Pending",
        title: "",
        description: "",
        priority: "P0",
        team: "",
        person: cookies.get('token')

    })



    const handleChange = (event) => {
        setTaskDetails({ ...taskDetails, [event.target.name]: event.target.value })
    }



    const handleUpdate = async (event) => {
        event.preventDefault()
        console.log(
            {
                userId: cookies.get('token'),
                taskId: taskCardData._id,
                priority: taskDetails.priority,
                status: taskDetails.status
            }
        )

        try {
            const response = await axios.post(HttmlURL + "update-task", {
                userId: cookies.get('token'),
                taskId: taskCardData._id,
                priority: taskDetails.priority,
                status: taskDetails.status
            })
            toast.success(response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            navigate(0)


        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }

    }



    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(HttmlURL + "add-task", taskDetails)
            toast.success(response.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
            navigate(0)


        } catch (error) {
            console.log(error)
            toast.error("Something Went Wrong", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

            });
        }



    }




    return (
        <div className={`flex ${addTaskCard ? "visible" : "invisible"} justify-center`}  >
            <ToastContainer />

            <form className=" fixed z-20 rounded-xl bg-white shadow-lg " >

                <button onClick={closeTaskCard} className=" absolute right-0 m-4 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 text-red-400 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>

                </button>
                <div className=" flex flex-col  p-4 w-96 h-96" >

                    <h2 className=" text-center font-medium text-2xl text-sky-700 " >Add Task</h2>

                    <label className="text-sky-800 font-medium" htmlFor="title" >Title</label>
                    <input
                        disabled={taskCardData.title !== undefined ? true : false}
                        value={taskCardData.title}
                        required
                        onChange={handleChange}
                        className="bg-slate-50 p-1 rounded-lg pl-2 my-2"
                        type="text"
                        name="title"
                        placeholder="Task Title..." ></input>

                    <label className="text-sky-800 font-medium" htmlFor="description" >Description</label>
                    <textarea
                        disabled={taskCardData.description !== undefined ? true : false}
                        value={taskCardData.description}
                        required
                        onChange={handleChange}
                        className="bg-slate-50 p-1 rounded-lg pl-2 my-2"
                        name="description"
                        placeholder="Task Description..." ></textarea>


                    <label className="text-sky-800 font-medium" htmlFor="team" >Team</label>
                    <select
                        disabled={taskCardData.team !== undefined ? true : false}
                        value={taskCardData.team}
                        className="my-1 bg-slate-50 p-1"
                        required onChange={handleChange} name="team">
                        <option value="Purchasing">Purchasing</option>
                        <option value="Sales">Sales</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Accounting">Accounting</option>
                        <option value="Finance">Finance</option>
                        <option value="I.T.">I.T.</option>

                    </select>

                    <label className="text-sky-800 font-medium" htmlFor="assignee" >Assignee</label>
                    <input
                        disabled={taskCardData.assignee !== undefined ? true : false}
                        value={taskCardData.assignee}
                        required
                        onChange={handleChange}
                        className="bg-slate-50 p-1 rounded-lg pl-2 my-2"
                        type="text"
                        name="assignee"
                        placeholder="Assignee" ></input>
                </div>

                <div className="flex justify-between -mt-4 p-4" >
                    <div className="flex flex-col">
                        <label className="text-sky-800 font-medium" htmlFor="priority" >Priority</label>
                        <select

                            value={taskCardData.priority}
                            required onChange={handleChange} name="priority">
                            <option value="P0">Priority 0</option>
                            <option value="P1">Priority 1</option>
                            <option value="P2">Priority 2</option>

                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sky-800 font-medium" htmlFor="status" >Status</label>
                        <select

                            value={taskCardData.status}
                            required onChange={handleChange} name="status">
                            <option value="Pending">Pending</option>
                            <option value="In-Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Deployed">Deployed</option>
                            <option value="Deferred">Deferred</option>

                        </select>
                    </div>
                </div>
                <div className="p-2">
                    {taskCardData.title === undefined
                        ?
                        <button onClick={handleSubmit} className=" bg-sky-400 w-full p-2 rounded-full text-white font-semibold ">
                            Add Task

                        </button>
                        :
                        <button onClick={handleUpdate} className="bg-sky-400 w-full p-2 rounded-full text-white font-semibold ">
                            Update

                        </button>}
                </div>
            </form>
        </div>
    )
}

export default AddTask