import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./components/Mainpage";
import First from "./components/First";
import Books from "./components/Book/Books";
import BookDetail from "./components/Book/BookDetail";
import Home from "./components/home/Home";
import AddUser from "./components/adduser/AddUser";
import UserTablica from "./components/UserTablica";
import UserDetail from "./components/users/UserDetail";
import Gridingrid from "./components/gridingrid/Gridingrid";
import Giveback from "./components/users/Giveback";
import Backbook from "./components/Book/Backbook";
import Borrowbook from "./components/Book/Borrowbook";
import UserForm from "./components/adduser/UserForm";
import Formaaddbook from "./components/addBook/Formaddbook";
import Dialog from "./components/userList/Dialog";
import Kalendarz from "./components/adduser/Kalendarz";
import Sidebar from "./components/sidebar/Sidebar";
import Sidebar1 from "./components/sidebar/Sidebar1";
import Sidebar2 from "./components/sidebar/Sidebar2";
import Sidebar3 from "./components/sidebar/Sidebar3";

function App() {

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <div className="container">

        <Routes>
          <Route path="/" element={<><Sidebar type="list"/> <First/></>} exact />
          <Route path="/Mainpage" element={<><Sidebar type="list"/> <Mainpage /></>} exact /> 
          <Route path="/Addbook" element={<><Sidebar type="list"/> <Formaaddbook/></>} exact />
          <Route path="/books" element={<><Sidebar type="list"/> <Books /></>} exact />
          <Route path="/books/:id" element={<><Sidebar type="list"/> <BookDetail /></>} exact />
          <Route path="/users/:id" element={<><Sidebar type="list"/> <UserDetail /></>} exact />
          <Route path="/Giveback/:id" element={<><Sidebar type="list"/> <Giveback /></>} exact />
          <Route path="/Backbook/:id" element={<><Sidebar type="list"/> <Backbook /></>} exact />
          <Route path="/Borrowbook/:id" element={<><Sidebar type="list"/> <Borrowbook /></>} exact />
          <Route path="/dialog" element={<><Sidebar type="list"/> <Dialog/></>} exact />
          <Route path="/kalendarz" element={<><Sidebar type="list"/> <Kalendarz/> </>} exact />
          <Route path="/addUser" element={<><Sidebar1 /> <AddUser /></>} exact />
          <Route path="/users" element={<><Sidebar1 /> <UserTablica /></>} exact />
          <Route path="/AddReader" element={<><Sidebar1 /> <UserForm/></>} exact />
          <Route path="/raport" element={<><Sidebar2/> <Home /></>} exact />
          <Route path="/Gridingrid" element={<><Sidebar3/> <Gridingrid /></>} exact />
       </Routes>

      </div>
    </React.Fragment>
  );
}

export default App;