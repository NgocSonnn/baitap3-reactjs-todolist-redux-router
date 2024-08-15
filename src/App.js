
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import AllTasks from "./pages/allTasks";
import NewTasks from "./pages/newTasks";
import DoingTasks from "./pages/doingTasks";
import DoneTasks from "./pages/doneTasks";
import AddNewTask from "./pages/addNewTasks";
import UpdateTask from "./pages/updateTask";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout></MainLayout>}>
            <Route path="/" element={<AllTasks></AllTasks >}></Route>
            <Route path="/alltasks" element={<AllTasks></AllTasks >}></Route>
            <Route path="/newtasks" element={<NewTasks></NewTasks >}></Route>
            <Route path="/doingtasks" element={<DoingTasks></DoingTasks >}></Route>
            <Route path="/donetasks" element={<DoneTasks></DoneTasks >}></Route>
            <Route path="/addnewtasks" element={<AddNewTask></AddNewTask>}></Route>
            <Route path="/updatetasks/:id" element={<UpdateTask></UpdateTask>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
