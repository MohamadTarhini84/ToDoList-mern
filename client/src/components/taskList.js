import { useTaskContext } from "../hooks/useTaskContext";
import { AuthContext } from "../context/authContext";
import { useContext, useEffect } from "react";
import Table from './table'
const axios=require('axios').default

function TaskList() {
  var {tasks, dispatch} = useTaskContext()
  const {user}=useContext(AuthContext)

  useEffect(() => {
    async function addTask() {
      try{
        const task=await axios.get('/tasks', {headers:{authorization:`Bearer ${user.token}`}})

        dispatch({type: "setTasks", payload: task.data[0].tasks})
      } catch(error){
        console.log(error.response)
        alert(error.response.data.errors)
      }
    }

    if(user){
      addTask()
    }
  }, [dispatch, user]);

  async function deleteTask(id) {
    try{
      const res=await axios.delete('/tasks/'+id, {headers:{authorization:`Bearer ${user.token}`}})
      dispatch({type:'removeTask', payload: res.data.tasks})
    } catch(error){
      alert(error.message)
    }
  }

  return (
    <div className="taskList w-full mt-8 flex justify-center">
      <Table tasks={tasks} deleteTask={deleteTask}/>
    </div>
  );
}

export default TaskList;
