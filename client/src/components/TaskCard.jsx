import { useContext, useState } from "react"
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AddTaskCardContext, AddTaskCardProvider } from "../AddTaskContext";

const HttmlURL = "https://task-board-6dwd.onrender.com/api/"

const TaskCard = (props) => {
    const { addTaskCard } = useContext(AddTaskCardContext)
    const { openTaskCard, closeTaskCard, taskCardData, updateCardData } = useContext(AddTaskCardContext)

    const navigate = useNavigate()
    const cookies = new Cookies(null, { path: '/', maxAge: 60 * 60 * 24 });

    const [removeData, setRemoveData] = useState({

        userId: cookies.get('token'),


    })



    const handleRemove = async (event) => {
        removeData.taskId = event.target.value

        try {
            const response = await axios.post(HttmlURL + "remove-task", removeData)
            toast.info(response.data, {
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
            toast.error((error.response.data).toString(), {
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




    const handleEditClick = () => {
        openTaskCard()
        updateCardData({
            title: props.title,
            description: props.description,
            team: props.team,
            priority: props.priority,
            status: props.status,
            assignee: props.assignee,
            _id: props.task
        })
    }


    return (
        <div>


            <ToastContainer />
            <div className="flex border m-1 flex-col" >

                <div className="flex border-b m-1 border-dashed justify-between p-2" >
                    <h4 className="flex-1 text-lg text-sky-700 " >{props.title}</h4>
                    <span className="flex-2 items-center m-2 p-1 text-white text-sm bg-blue-500 h-6 w-6 text-center " >{props.priority}</span>
                </div>
                <div className="m-1 p-1">
                    <span className="  text-sm text-gray-500 ">
                        {props.description}
                    </span>
                    <br></br>

                </div>
                <span className=" text-sm px-2 text-sky-500 ">
                    @{props.assignee}
                </span>
                <div className="m-1 p-1 flex justify-between " >
                    <span className="flex-1 text-cyan-600" >{props.team}</span>

                    <button onClick={handleEditClick} className=" bg-sky-600 w-8 h-8 flex flex-2 justify-center items-center " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 text-white text-center h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                    </button>


                </div>
                <div className="m-1 flex justify-between p-1">
                    <span className=" bg-sky-900 text-white p-1 px-4 rounded-xl " >{props.status}</span>
                    <button className="text-red-400" onClick={handleRemove} value={props.task} >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard