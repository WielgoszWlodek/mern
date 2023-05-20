import { Button } from "@mui/material";
import axios from "axios";
import "./Book.css";
import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router'
import { Link, useNavigate } from "react-router-dom";

  
const Book = (props) => {
const history = useNavigate();

  const { _id, name, author, description, price, image, categories, available, likes } = props.book;
  const deleteHandler = async () => {
    await axios
      .delete(`/books/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/books"));
  };

  
  const[cats, setCats]= useState([]);

  useEffect(()=>{
   const getCats = async ()=>{
     const res = await axios.get("/categories")
     setCats(res.data)
   }
   getCats()
  },[]);
 
  
const image1 = "https://blog.arkieva.com/wp-content/uploads/2021/04/pandemic-induced-product-shortage-social.png"
  return (
  
      <div className="card">
      <img src={image ? image : image1 } 
      alt={name} />
      <article>Autor: {author}</article>
      <h3>Tytuł: {name}</h3>
      {/*<p>Opis: {description}</p>*/}
      <p>Kategoria: {categories}</p>
      <p>Nr. katalogu: {price}</p>
      <h4> {likes[0] ? <div className = "red">Wypożyczona</div> : <div className= "green">Dostępna</div>}</h4>
      <Button LinkComponent={Link} to={`/books/${_id}`} sx={{ mt: "auto" }}>
        Edytuj
      </Button>
      <Button color="error" onClick={deleteHandler} sx={{ mt:"auto" }}>
        Usuń 
      </Button>
    </div>


  
  );
};

export default Book;