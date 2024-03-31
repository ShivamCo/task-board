import { createContext, useContext, useEffect, useState } from "react";



const TaskDataContext = createContext();

const TaskDataProvider = ({ children }) => {

    const [filterData, setFilterData] = useState([]);

    const updateTaskData = (data) => {
        setFilterData(data)
    };



    return (
        <TaskDataContext.Provider value={{ filterData, updateTaskData }}>
            {children}
        </TaskDataContext.Provider>
    )



}

export { TaskDataContext, TaskDataProvider }

