import { TaskContext } from "../context/taskContext";
import { useContext } from "react";

export const useTaskContext =()=>{
    const context=useContext(TaskContext)

    if(!context){
        throw Error("useTaskContext used outside of taskContextProvider")
    } else
        return context
}