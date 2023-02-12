import DeleteIcon from '@mui/icons-material/Delete';
import ReactTimeAgo from 'react-time-ago'

function task(props){
    const task=props.object

    return (
        <div className="task-preview flex justify-between h-24 m-4 bg-white rounded-sm shadow-md hover:scale-105
                        hover:rounded-lg transition-all ease-in-out">
            <div className="flex flex-col max-w-full">
                <h1 className="mt-2 mx-2 font-bold text-lg text-cyan-400 capitalize">{task.title}</h1>
                <p className="mx-2 ">{task.description}</p>
            </div>
            <div className="relative">
                <DeleteIcon onClick={() => props.func(task._id)} className='text-cyan-400 absolute top-1 right-2
                        hover:cursor-pointer hover:scale-125 transition-all'/>
                {task.createdAt && 
                    <ReactTimeAgo date={Date.parse(task.createdAt)} locale="en-US" 
                        className='text-xs absolute bottom-2 right-2 w-24 text-gray-500 text-center'/>}
            </div>
        </div>
    )
}

export default task