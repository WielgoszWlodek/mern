
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userList.css";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";


const UserList= () =>{
const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const[cats, setCats]= useState([]);
 

  

  //useEffect(() => {
    //const fetchData = async () => {
      //const res = await axios.get(`http://localhost:5000/books?q=${query}`);
      //setBooks(res.data);
    //};
    //if (query.length === 0 || query.length > 2) fetchData();
  //}, [query]);



  //pobieram kategorie. Potrzebne do wyświetlenia dropbox
  useEffect(()=>{
  const getCats = async ()=>{
    const res = await axios.get("/categories")
    setCats(res.data)
  }
  getCats()
 },[]);
// koniec

//kasuję item
  const handleDelete = (id) => {
    setBooks(books.filter((item) => item.id !== id));
  };
  //koniec
  
  //pobieram dane z bazy i szukam kategorie
const URL = `http://localhost:5000/books?cat=${query}`;
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
  useEffect(() => {
    fetchHandler()
    .then((data) => setBooks(data.books));
  }, [query]);
 
// koniec pobierania danych


const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Tytuł', width: 230, renderCell: (params) => {
    return (
      <div className="userListUser">
        <img className="userListImg" src={params.row.image} alt="" /> 
         {params.row.name}
          </div>
        );
      },
     },
  { field: 'author', headerName: 'Autor', width: 130 },
  { field: 'description', headerName: 'Opis', width: 130 },
  { field: 'categories', headerName: 'Gatunek', width: 80 },
  {
    field: 'price',
    headerName: 'Cena',
    type: 'number',
    width: 90,
  },
 
  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Link to={"/books/" + params.row._id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params.row._id)}
          />
        </>
      );
    },
  },
 ];




  return ( 
    <div >      
  {/*         <ul>
  {cats.map((c)=>(
    <Link to={`?cat=${c.name}`}>
   <li>{c.name}</li>
   </Link>
  ))}</ul>*/}
 
  <div className="app">
          <div className="addProductItem">
            <label>Gatunki</label>
            <select name="type"  onChange={(e) => setQuery(e.target.value.toLowerCase())}>
            <option value="">Wszystkie</option>
               <option value="przygoda">Przygodowe</option>
              <option value="dramat">Dramat</option>
              <option value="komedia">Komedia</option>
            </select>
          </div>
          <div className="search">
          <label>Szukaj</label>
        <input 
          placeholder="Szukaj..."
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
    </div>
    </div>

    <div style={{ height: 400, width: '100%'}}> 
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
   </div>
 ); 
}

export default UserList;