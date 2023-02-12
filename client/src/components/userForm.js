import Button from './button'
import Input from './input'
import {useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
const axios=require('axios').default

function UserForm(){
    const [username, setName]= useState("")
    const [password, setPass]= useState("")
    const {dispatch}=useAuthContext()

    async function SignUp(e){
        e.preventDefault()
        try{
            const user = await axios.post('/signup',{
                name: username,
                pass:password
            })

            localStorage.setItem('user', JSON.stringify(user))
            dispatch({type:'login',payload:user.data})
        } catch(error){
            alert(error.response.data.errors)
        }
    }
    
    async function LogIn(e){
        e.preventDefault()
        try{
            const user =await axios.post('/login',{
                name: username,
                pass:password
            })
            
            localStorage.setItem('user', JSON.stringify(user.data))
            dispatch({type:'login',payload:user.data})
        } catch(error){
            alert(error.response.data.errors)
        }
    }

    return (
        <form className="flex justify-evenly text-blue-400">
            <Input type="text" placeholder="Enter Username" label="username: " func={setName}/>
            <Input type="password" placeholder="Enter Password" label="password: " func={setPass}/>
            <Button value="Log In" onClick={(e)=>{LogIn(e)}}/>
            <Button value="Sign Up" onClick={(e)=>{SignUp(e)}}/>
        </form>
    )
}

export default UserForm