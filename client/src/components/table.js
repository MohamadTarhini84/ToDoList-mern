import Task from './task'

function table(props){
    const tasks=props.tasks
    
    return (
        <div className='bg-cyan-400 w-2/3 p-4 rounded-md relative shadow-lg'>
            {tasks && tasks.length===0 && <h1 className='text-white text-center font-extrabold'>You don't have any tasks yet</h1>}
            {tasks &&
            tasks.map((task) => 
                <Task key={task._id} object={task} func={props.deleteTask}/>
            )}
        </div>
    )
}

export default table