import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import Books from "./components/Book/Books";
import About from "./components/About";
import BookDetail from "./components/Book/BookDetail";
import Sidebar from "./components/sidebar/Sidebar";
import "./App.css";

function App({type}) {

 

    if (
      
      <Routes>
      <Route path="/books"  exact />
       </Routes>
   
       ) return <React.Fragment>
    <header>
      <Header />
    </header>
    <div className="container">
    <Sidebar type=""/>
         <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/add" element={<AddBook/>} exact />
        <Route path="/books" element={<Books />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/books/:id" element={<BookDetail />} exact />
         </Routes>
  
    </div>
  </React.Fragment>
    if (     <Routes>

      <Route path="/about" exact />

       </Routes>
) return <React.Fragment>
    <header>
      <Header />
    </header>
    <div className="container">
    <Sidebar type="list"/>
         <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/add" element={<AddBook/>} exact />
        <Route path="/books" element={<Books />} exact />
        <Route path="/about" element={<About />} exact />
        <Route path="/books/:id" element={<BookDetail />} exact />
         </Routes>
  
    </div>
  </React.Fragment>


  
}

export default App;