import UserForm from './userForm'
import Welcome from './welcome';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';

function NavBar(){
    const {user}=useContext(AuthContext)

    return (
        <div className="NavBar flex w-full h-16 bg-cyan-500 justify-between text-white
                        items-center px-6">
            <div className="Logo text-3xl">
                ToDo List
            </div>
            {user?<Welcome/>:<UserForm/>}
        </div>
    )
}

export default NavBar;