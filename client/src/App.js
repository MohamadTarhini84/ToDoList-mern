import TaskList from "./components/taskList";
import TaskInput from "./components/taskInput";
import NavBar from "./components/navBar";
import "./assets/global.css"
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const {user}=useContext(AuthContext)
  
  return (
    <div className="App flex-col justify-evenly align bg-gray-100 min-h-screen">
      <NavBar />
      <TaskInput/>
      {user && <TaskList />}
    </div>
  );
}

export default App;
