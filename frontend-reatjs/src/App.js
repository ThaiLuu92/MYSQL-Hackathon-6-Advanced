
import LoginComponent from './pages/login/login';
import TaskList from './pages/tasks/tasks';
import UserTaskList from './pages/tasks/tasks_user';




function App() {
  
  return (
    <div className="App">
   <LoginComponent/>
   <TaskList/>
   <UserTaskList/>
    </div>
  );
}

export default App;
