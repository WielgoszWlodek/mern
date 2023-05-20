import { Button, Typography, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import UserList from "./userList/UserList";
import "./addBook.css";


const Mainpage = () => {
  return (
    <div className="addAbout">
    <UserList />
    </div>
  );
};

export default Mainpage;