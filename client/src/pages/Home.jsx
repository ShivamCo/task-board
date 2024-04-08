import { useContext, useEffect, useState } from "react";
import axios from "axios"

import Header from "../components/Header";
import AddTask from "../components/AddTask";
import Tasks from "../components/Tasks";

const HttmlURL = "https://task-board-6dwd.onrender.com/api/"

import { TaskDataContext } from "../TaskDataContext";
import { AddTaskCardContext } from "../AddTaskContext";
import Cookies from 'universal-cookie';

const HomePage = () => {

    const { updateTaskData } = useContext(TaskDataContext)
    const cookies = new Cookies(null, { path: '/', maxAge:60 * 60 * 24 });

    const { addTaskCard } = useContext(AddTaskCardContext)
    const { openTaskCard, closeTaskCard, taskCardData, updateCardData } = useContext(AddTaskCardContext)

    const [filterData, setFilterData] = useState({})

    filterData.userId = cookies.get('token')

    const [taskDetails, setTaskDetails] = ([])
    const [isLoading, setIsLoading] = useState(null)

    const handleChange = async (event) => {

        setFilterData({ ...filterData, [event.target.name]: event.target.value })

    }

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post(HttmlURL + "task-data", filterData)
            updateTaskData(response.data)
            
            setIsLoading(false)


        } catch (error) {
            console.log(error)
        }
    }

    const handleApllyFilter = async (event) => {

        event.preventDefault()
        getData()
    }

    const handleOpenAddTask = () => {
        updateCardData({
            title: undefined,
            description: undefined,
            team: undefined,
            assignee: undefined,
            _id: undefined
            

        })
        openTaskCard()
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <div className={`h-svh bg-slate-50 `} >
            <Header />
            {
                addTaskCard &&
                <div className=" flex justify-center">
                    <AddTask />


                </div>
            }

            {/* Filter */}
            <div className={`flex ${addTaskCard && 'blur-sm'}  bg-slate-50 left-0 overflow-auto justify-between`} >

                <form onSubmit={handleApllyFilter} className=" justify-start flex sm:justify-center items-center m-4" >
                    <p className="text-sky-600 font-medium px-2" >Fliter By</p>
                    <input onChange={handleChange} name="title" type="text" className=" bg-sky-50 rounded-lg p-1 border " placeholder="Task Title" >
                    </input>
                    <p className="text-sky-600 font-medium px-2">Priority</p>
                    <select onChange={handleChange} className=" border rounded-lg p-1 text-sky-700 px-2 bg-sky-50 " name="priority">
                        <option value="" >Show All</option>
                        <option value="P0">Priority 0</option>
                        <option value="P1">Priority 1</option>
                        <option value="P2">Priority 2</option>
                    </select>
                    <p className="text-sky-600 font-medium px-2">Date</p>
                    <input onChange={handleChange} className=" border rounded-lg p-1 text-sky-700 px-2 bg-sky-50 " type="date" name="from" >
                    </input>

                    <button className="p-1 px-4 ml-2 bg-blue-400 text-white font-semibold rounded-full" type="submit">Apply</button>
                </form>




                <div className="m-4">
                    <button onClick={handleOpenAddTask} className="flex shadow-md rounded-2xl hover:bg-sky-800 text-white bg-sky-400 border p-2 px-4 justify-center items-center">

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className=" pl-2 font-semibold ">
                            Add Task
                        </span>

                    </button>

                </div>
            </div>
            <div className={` ${addTaskCard && 'blur-sm'}  flex flex-col h-full border-dashed  m-8 border-2 border-blue-400 rounded-lg`}>





                {/* Body */}

                {
                    isLoading ?
                        <div className="w-full flex  justify-center items-center" >
                            <div className="flex justify-center items-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                                <span
                                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                            </div>
                        </div>
                        :

                        <div className=" h-full bg-slate-200" >
                            <Tasks />
                        </div>}
            </div>
        </div>
    )

}

export default HomePage;