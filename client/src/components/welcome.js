import { useAuthContext } from "../hooks/useAuthContext"
import { useTaskContext } from "../hooks/useTaskContext"
import { AuthContext } from "../context/authContext"
import { useContext } from "react"
import Button from "./button"

function Welcome(){
    const {dispatch}=useAuthContext()
    const {dispatch:dispatch2}=useTaskContext()
    const {user}=useContext(AuthContext)  
    
    function LogOut(e){
        e.preventDefault()
        localStorage.removeItem('user')
        dispatch2({type:'setTasks', payload:null})
        dispatch({type:'logout'})
    }
    return (
        <div className="flex justify-evenly text-blue-400">
            <h1 className="text-white mr-4">Welcome {user.name}</h1>
            <Button value="Logout" colour="white" onClick={(e)=>{LogOut(e)}}/>
        </div>
    )
}

export default Welcome