import React, { useEffect, useState } from "react";
import "./Book.css";
import axios from "axios";
import Book from "./Book";
import {useLocation} from 'react-router'
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../../src/hooks/useFetch";

const Books = () => {

const {data, loading, error}= useFetch("/books?=dramat");


  const[cats, setCats]= useState([]);
   useEffect(()=>{
   const getCats = async ()=>{
     const res = await axios.get("/categories")
     setCats(res.data)
   }
   getCats()
  },[]);

const {search} = useLocation();
const URL = "/books";
const fetchHandler = async () => {
  return await axios.get(URL)
  .then((res) => res.data);
};
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);

  //.then(res=>res.json())
  //.then(setCards)

  return (
   
    <div className="user">
      <ul>
        {books &&
          books.map((book, i) => (
            <li key={i}>
              <Book book={book} />
           </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;