import { createContext, useReducer } from "react";

export const TaskContext = createContext()

export const taskReducer =(state,action)=>{
    switch(action.type){
        case "setTasks":
            return {tasks: action.payload}
        case "addTask":
            return {tasks: [...state.tasks, action.payload]}
        case "removeTask":
            return {tasks: action.payload}
        default:
            return state
    }
}

export const TaskContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(taskReducer, {
        tasks:null
    })

    return (
        <TaskContext.Provider value={{...state, dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}