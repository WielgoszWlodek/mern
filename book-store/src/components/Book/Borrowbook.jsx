import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import "./Book.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router";
import {
  Button,
 
} from "@mui/material";
import Alert from '@mui/material/Alert';
import CheckBox from '@mui/icons-material/CheckBox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import PersonIcon from '@mui/icons-material/Person';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TitleIcon from '@mui/icons-material/Title';
import Grid from '@mui/material/Grid';



const PF = process.env.REACT_APP_PUBLIC_FOLDER;


const Borrowbook = () => {
    const [books, setBooks] = useState(); 
    
  const URL1 = `/books`;
  const fetchHandler1 = async () => {
    return await axios.get(URL1).then((res) => res.data);
  };
    useEffect(() => {
      fetchHandler1()
      .then((data) => setBooks(data.books));
    }, []);

  const location = useLocation();
    const path = location.pathname.split("/")[2];
   
  const [like, setLike] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [zmienna, setZmienna] = useState("");
  const [query1, setQuery1] = useState("");
  const [query2, setQuery2] = useState("");
  const [kolor, setKolor] = useState("grey");
 
  
  const handleDelete = (zmienna) => {
   setZmienna(zmienna);
   setLike(!isLiked &&  <Alert severity="info">Czytelnik został zaznaczony</Alert>);
  };
 
//  useEffect(() => {
  //  setIsLiked(books.likes.includes(zmienna));
  //}, [zmienna, books.likes]);

const history = useNavigate();
  const likeHandler = () => { 
    if (zmienna){
    try {     
      axios.put("/books/" + path + "/like", { userId: zmienna });
    } catch (err) {}
    setLike(!isLiked && <Alert severity="success">Książka została <strong>wypożyczona</strong> </Alert>);
    //{()=>navigate("/books")}
  
  }
  else {
    setLike(!isLiked && <Alert severity="error">Zaznacz czytelnika </Alert>);

  }}


  const [inputs, setInputs] = useState();
  const id = useParams().id;
 const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/users/search?q=${query1}`);
      setUsers(res.data);
    };
    fetchData();
  }, [query1]);

  useEffect(() => {
    const fetchData1 = async () => {
      const res = await axios.get(`/users/nrkarty?q=${query2}`);
      setUsers(res.data);
    };
    fetchData1();
  }, [query2]);



  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`/books/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.book));
    };
    fetchHandler();
  }, [id]);

  const URL = `/users`;
  const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
  };
    useEffect(() => {
      fetchHandler()
      .then((data) => setUsers(data.users));
    }, [query]);


    const columns = [
      {
       field: "action",
       headerName: "Zaznacz czytelnika",
       width: 140,
       align: 'center',
       renderCell: (params) => {
         return (
           <>
          
            
             <CheckBox
               style ={{color:kolor}}
               onClick={() => handleDelete(params.row._id)}
             />
             
           </>
         );
       },
     },
       { field: 'name', headerName: 'Imię i nazwisko',  headerAlign: 'center',  headerClassName: 'super-app-theme--header', width: 180
       },
       {
         field: 'nrkarty',
         headerName: 'Numer karty',
         type: 'number',
   
         headerAlign: 'center',
         width: 110,
        },
        
   
      
      ];
  
  return (
    <Grid container spacing={3}  columns={16}>
  <Grid item xs={4}>
        {inputs && (
   <List
      sx={{
        width: '100%',
        maxWidth: 300,
        bgcolor: 'background.paper',
      }}
    >
  <ListItem>
      <ListItemAvatar>
        <Avatar>
          <TitleIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Tutuł" secondary={inputs.name} />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <PersonIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Autor" secondary={inputs.author} />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <AccountTreeIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Gatunek" secondary={inputs.categories} />
    </ListItem>
   
      <Divider variant="inset" component="li" />
   
    </List>
       )}
  </Grid>
  <Grid item xs={8}>
    <div className="app">
         
         <div className="addProductItem">
         <input 
         placeholder="Imię i nazwisko"
         onChange={(e) => setQuery(e.target.value)}
       />
        </div>
        <div className="addProductItem">
         <input 
         placeholder="Nr karty"
         onChange={(e) => setQuery1(e.target.value)}
       />
        </div>
       
        </div>
        <div style={{ height: 400, width: '80%'}}> 

        <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        getRowId={row=>row._id}
      />
      </div>
       <Button style={{  width: '80%'}} onClick={likeHandler} variant="contained" type="submit">
         Wypożycz
        </Button> 
      
  </Grid>

        <Grid item xs={4}>
           <div >
        <span style={{width:'200px'}}>{like}</span>
        </div>
        </Grid>
  


      
      
   </Grid>
  );
};

export default Borrowbook;










