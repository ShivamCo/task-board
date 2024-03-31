import { createContext, useContext, useEffect, useState } from "react";



const AddTaskCardContext = createContext();

const AddTaskCardProvider = ({ children }) => {

    const [addTaskCard, setAddTaskCard] = useState(false);
    const [taskCardData, setTaskCardData] = useState({
        title: undefined,
        description: undefined,
        team: undefined,
        assignee: undefined,
        _id: undefined
        
        
    })

    const openTaskCard = () => {
        setAddTaskCard(true)
    }

    const closeTaskCard = () => {
        setAddTaskCard(false)
    }
    const updateCardData = (data) => {
        setTaskCardData(data)
    };



    return (
        <AddTaskCardContext.Provider value={{ addTaskCard, updateCardData, taskCardData, openTaskCard, closeTaskCard }}>
            {children}
        </AddTaskCardContext.Provider>
    )



}

export { AddTaskCardContext, AddTaskCardProvider }