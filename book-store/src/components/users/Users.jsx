
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./users.css";
import axios from "axios";
import { DeleteOutline } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const Users= () =>{
const [query, setQuery] = useState("");
const [query1, setQuery1] = useState("");
const [users, setUsers] = useState([]);
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



const Button1= ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/users/search?q=${query}`);
      setUsers(res.data);
    };
    fetchData();
  }, [query]);


  useEffect(() => {
    const fetchData1 = async () => {
      const res = await axios.get(`/users/nrkarty?q=${query1}`);
      setUsers(res.data);
    };
    fetchData1();
  }, [query1]);

//Usuwanie pcczątek
const handleDelete = async (id) => {
  try {
    await axios.delete(`/users/${id}`);
    setUsers(users.filter((item) => item._id !== id));
  } catch (err) {}
};
  //koniec
  
  //pobieram dane z bazy i szukam kategorie
const URL = `/users`;
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
  useEffect(() => {
    fetchHandler()
    .then((data) => setUsers(data.users));
  }, []);
 
// koniec pobierania danych




const columns = [
 
  { field: 'name', headerName: 'Imię i nazwisko',  headerClassName: 'super-app-theme--header', width: 180
     },


  {
    field: 'nrkarty',
    headerName: 'Numer karty',
    type: 'number',
    width: 100,
    headerAlign: 'center',
   },

   /*{
    field: "Wypożycz",
    headerName: "Wypożycz",
    width: 100,
    renderCell: (params) => {
      return (
        <>
        
        {!params.row.available &&  <Link to={"/giveback/" + params.row._id}><Button1 type="Oddaj" /></Link> }
        {params.row.available &&  <Link to={"/giveback1/" + params.row._id}><Button1 type="Wypożycz" /></Link> }
        </>
      );
    },
  },*/

  {
    field: "action",
    headerName: "Edytuj",
    width: 80,
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <>
       
          <Link to={"/users/" + params.row._id}>
          <button className="userListEdit">Edytuj</button>
          </Link>


          </>
      );
    }},    
    {
      field: "action1",
      headerName: "Usuń",
      width: 80,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
          
      <Button variant="outlined"
         onClick={() => {
          handleClickOpen(params.row._id)
        }}
       >
         < DeleteOutline
          
           
          /> 
      </Button>
      <Dialog  
        open={open}  
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          { "Uwaga"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Czy usunąć czytelnia?
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
          <input 
          placeholder="Szukaj imię i nazwisko"
          onChange={(e) => setQuery(e.target.value)}
        />
         </div>
         <div className="addProductItem">
          <input 
          placeholder="Szukaj nr karty..."
          onChange={(e) => setQuery1(e.target.value)}
        />
         </div>
 </div>

    <div style={{ height: 450, width: '100%'}}> 
   
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={6}
        rowsPerPageOptions={[6]}
        //checkboxSelection
        getRowId={row=>row._id}
      />
      
    </div>


   </div>
 );    
}

export default Users;