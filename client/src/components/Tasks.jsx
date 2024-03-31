import { useContext, useEffect, useState } from "react"
import { TaskDataContext } from "../TaskDataContext"
import AddTask from "./AddTask"

import TaskCard from "./TaskCard"
import { useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HttmlURL = "http://localhost:4000/api/"

import { AddTaskCardContext, AddTaskCardProvider } from "../AddTaskContext"

const Tasks = () => {
    
    const { filterData } = useContext(TaskDataContext)
    const { addTaskCard } = useContext(AddTaskCardContext)
    const { openTaskCard, closeTaskCard } = useContext(AddTaskCardContext)
    


    return (
        <div className="m-4 flex overflow-auto h-full gap-4 ">
           
                    
                        <div className="flex  flex-col border rounded-lg border-sky-200 bg-white h-5/6 w-96">
                            <div className="p-1 text-center rounded-t-lg bg-gray-400 ">
                                <h3 className=" font-semibold text-white  " >Pending</h3>
                            </div>
                            <div className="overflow-auto" >
                                {filterData?.filter(i => i.status === "Pending").map(i => (
                                    <TaskCard
                                        title={i.title}
                                        description={i.description}
                                        status={i.status}
                                        team={i.team}
                                        assignee={i.assignee}
                                        priority={(i.priority).toUpperCase()}
                                        task={i._id}
                                        key={i.id}
                                    />
                                ))}


                            </div>

                        </div>
                        <div className="flex   flex-col border rounded-lg border-sky-200 bg-white h-5/6 w-96">
                            <div className="p-1 text-center rounded-t-lg bg-yellow-400 ">
                                <h3 className=" font-semibold text-white" >In Progress</h3>
                            </div>
                            <div className="overflow-auto" >
                                {filterData?.filter(i => i.status === "In-Progress").map(i => (
                                    <TaskCard
                                        title={i.title}
                                        description={i.description}
                                        status={i.status}
                                        team={i.team}
                                        assignee={i.assignee}
                                        priority={(i.priority).toUpperCase()}
                                        task={i._id}
                                        key={i.id}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className="flex   flex-col border rounded-lg border-sky-200 bg-white h-5/6 w-96">
                            <div className="p-1 text-center rounded-t-lg bg-green-400 ">
                                <h3 className=" font-semibold text-white  " >Completed</h3>
                            </div>
                            <div className="overflow-auto" >
                                {filterData?.filter(i => i.status === "Completed").map(i => (
                                    <TaskCard
                                        title={i.title}
                                        description={i.description}
                                        status={i.status}
                                        team={i.team}
                                        assignee={i.assignee}
                                        priority={(i.priority).toUpperCase()}
                                        task={i._id}
                                        key={i.id}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className="flex   flex-col border rounded-lg border-sky-200 bg-white h-5/6 w-96">
                            <div className="p-1 text-center rounded-t-lg bg-purple-400 ">
                                <h3 className=" font-semibold text-white  " >Deployed</h3>
                            </div>
                            <div className="overflow-auto" >
                                {filterData?.filter(i => i.status === "Deployed").map(i => (
                                    <TaskCard
                                        title={i.title}
                                        description={i.description}
                                        status={i.status}
                                        team={i.team}
                                        assignee={i.assignee}
                                        priority={(i.priority).toUpperCase()}
                                        task={i._id}
                                        key={i.id}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className="flex   flex-col border rounded-lg border-sky-200 bg-white h-5/6 w-96">
                            <div className="p-1 text-center rounded-t-lg bg-red-400 ">
                                <h3 className=" font-semibold text-white  " >Deferred</h3>
                            </div>
                            <div className="overflow-auto" >
                                {filterData?.filter(i => i.status === "Deferred").map(i => (
                                    <TaskCard
                                        title={i.title}
                                        description={i.description}
                                        status={i.status}
                                        team={i.team}
                                        assignee={i.assignee}
                                        
                                        priority={(i.priority).toUpperCase()}
                                        task={i._id}
                                        key={i.id}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
            

        
    )

}






export default Tasks