import Button from './button'
import Input from './input'
import { useTaskContext} from '../hooks/useTaskContext';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
const axios=require('axios').default

function TaskInput() {
  const {dispatch} = useTaskContext()
  const [inputData,setInputData]=useState('')
  const {user}=useContext(AuthContext)

  let descData;
  function storeData(event){
    descData=event.target.value
  }

  async function addTask() {
    try{
      const task=await axios.post('/tasks/new',{
        user:"1",
        title: inputData,
        description: descData
      },{headers:{authorization:`Bearer ${user.token}`}})
      
      console.log(task)
      if(!task.data.tasks){
        alert("Error: Make sure you've set a title!")
        return 
      }
      if(task){
        dispatch({type:"addTask", payload: task.data.tasks.slice(-1)[0]})
      }
    } catch(error){
      if(!error.response){
        alert("You must be logged in to add a task")
      }else{
        alert(error.response.data.errors)
      }
    }
  }
        

  return (
    <div className='flex flex-col items-center text-white'>
      {false && user}
      <div className="pt-6 flex justify-center text-black">
        <Input type="text" placeholder="Enter Title" func={setInputData}/>
      </div>
      <div className='w-1/2'>
        <textarea className='w-full p-2 rounded-md shadow-lg m-4 focus:outline-none text-black' 
                  placeholder='Enter Description' onChange={storeData}></textarea>
      </div>
      <Button value="Add New Task" colour="cyan-500" onClick={addTask}/>
    </div>
  );
}

export default TaskInput;