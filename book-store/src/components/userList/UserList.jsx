
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./userList.css";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const UserList= () =>{
const [query, setQuery] = useState("");
const [query1, setQuery1] = useState("");
const [query2, setQuery2] = useState("");
const [books, setBooks] = useState([]);
const[cats, setCats]= useState([]);
const [wynik, setWynik] = useState("");
const [open, setOpen] = React.useState(false);




const handleClickOpen = (id) => {
  
  setWynik(id);
  setOpen(true);
  console.log(wynik);
};
 
const handleClose = () => {
  setOpen(false);
};

const location = useLocation();
const path = location.pathname.split("/")[1]; 

//Tutaj wyszukuję nrksiążki
const URL2 = `http://localhost:5000/books/tytul?q=${query2} `;
const fetchHandler2 = async () => {
  return await axios.get(URL2).then((res) => res.data);
};
  useEffect(() => {
    fetchHandler2()
    .then((data) => setBooks(data.books));
  }, [query2]);

//Tutaj wyszukuję nrksiążki
  const URL1 = `http://localhost:5000/books?q=${query1} `;
  const fetchHandler1 = async () => {
    return await axios.get(URL1).then((res) => res.data);
  };
    useEffect(() => {
      fetchHandler1()
      .then((data) => setBooks(data.books));
    }, [query1]);

  //pobieram kategorie. Potrzebne do wyświetlenia dropbox
  useEffect(()=>{
  const getCats = async ()=>{
    const res = await axios.get("http://localhost:5000/categories")
    setCats(res.data)
  }
  getCats()
 },[]);
// koniec

//Usuwanie pcczątek
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/books/${id}`);
    setBooks(books.filter((item) => item._id !== id));
  } catch (err) {}
};
  //koniec
  
  //pobieram dane z bazy i szukam kategorie
const URL = `http://localhost:5000/books?cat=${query} `;
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
  useEffect(() => {
    fetchHandler()
    .then((data) => setBooks(data.books));
  }, [query]);
 
// koniec pobierania danych







const Button1 = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};

const columns = [
 
  { field: 'name', headerName: 'Tytuł',  headerClassName: 'super-app-theme--header', width: 130, renderCell: (params) => {
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
    headerName: 'Nr książki',
    type: 'number',
    align: 'center',
    width: 80,
   },
   { field: 'likes', align: 'center', headerName: 'Wypożyczona', width: 100, 
  
   renderCell: (params) => {
    return (
      <>
    { params.row.likes[0] ? <div className="Oddaj">Wypożyczona</div> : <div className="Wypożycz">Dostępna</div>}
      </>
    )
  },
},
  {
    field: "action",
    headerName: " Edytuj   ",
    width: 80,
    renderCell: (params) => {
      return (
        <>
       
          <Link to={"/books/" + params.row._id}>
            <button className="userListEdit">Edytuj</button>
          </Link>
</>
)}},


{
    field: "action1",
    headerName: "   Usuń ",
    width: 80,
    renderCell: (params) => {
      return (
        <>

          <div>
          <Button variant="outlined"
         onClick={() => {
          handleClickOpen(params.row._id)
        }}
       >
        <DeleteOutline
          /> 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Uwaga"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Czy usunąć książkę?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nie</Button>
          <Button   className="userListDelete"
           onClick={() => {
            handleDelete(wynik);
            handleClose();
           
          }}
            >
            Tak
          </Button> 
        </DialogActions>
      </Dialog>
    </div> 
    </>
)}},       

{
  field: "action2",
  headerName: " Wypożycz ",
  width: 100,
  renderCell: (params) => {
    return (
      <>


          { params.row.likes[0] ? <Link to={"/backbook/" + params.row._id}>
                        <Button1 type="Oddaj"/> </Link> : <Link to={"/borrowbook/" + params.row._id}>
                        <Button1 type="Wypożycz"/>  </Link> }
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
           
            <select name="type"  onChange={(e) => setQuery(e.target.value.toLowerCase())}>
            <option value="">Wszystkie gatunki</option>
            {cats.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
         </div>
          <div className="addProductItem">
          <input 
          placeholder="Szukaj nr książki..."
          onChange={(e) => setQuery1(e.target.value.toLowerCase())}
        />
         </div>
         <div className="addProductItem">
          <input 
          placeholder="Szukaj tytuł książki..."
          onChange={(e) => setQuery2(e.target.value)}
        />
         </div>
 </div>

    <div style={{ height: 500, width: '100%'}}> 
   
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        checkboxSelection
        getRowId={row=>row._id}
      />
     
    </div>
   </div>
 ); 
}

export default UserList;