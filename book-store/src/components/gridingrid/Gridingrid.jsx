import PropTypes from 'prop-types';
import {Box, Button} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./Gridingrid.css";
import Alert from '@mui/material/Alert';
import CheckBox from '@mui/icons-material/CheckBox';import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import NumbersIcon from '@mui/icons-material/Numbers';
import { Grid, } from '@material-ui/core';

import React, { useEffect, useState } from "react";

import axios from "axios";


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row"> {row.name} </TableCell>
        
        <TableCell align="right">{row.nrkarty}</TableCell>
        <TableCell align="right">{row.available}</TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Informacje o książce
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Gatunek</b></TableCell>
                    <TableCell><b>Nr katalogu</b></TableCell>
                    <TableCell align="right"><b>Data</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.name1}>
                      <TableCell component="th" scope="row"> {historyRow.name1}</TableCell>
                      <TableCell>{historyRow.nrkarty1}</TableCell>
                      <TableCell align="right">{historyRow.available1}</TableCell>
                      <TableCell align="right">{historyRow.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}






export default function Gridingrid() {
    

const [query, setQuery] = useState("");
const [users, setUsers] = useState([]);
const [books, setBooks] = useState([]);



const [query1, setQuery1] = useState("");
const [data, setData] = useState([]);
const [iddotimeline, setIddotimeline] = useState("");


const handleDelete = async (iddotimeline) => {
  setIddotimeline(iddotimeline);
};


useEffect(() => {
  const fetchData = async () => {
    const res = await axios.get(`/users/search?qa=${query1}`);
    setData(res.data);
  };
  fetchData();
}, [query1]);






  useEffect(()=>{
const fetchPosts = async () =>{
  const res = await axios.get(`/books/timeline/${iddotimeline}`);
  setBooks(res.data)
;}
fetchPosts();
  }, [iddotimeline])
  



 console.log(books[2]);

  function createData(name, nrkarty,  name1, nrkarty1, available1, description ) {
  return {
    name,
    nrkarty,
       
        history: [
          {
            name1,
             nrkarty1,
              available1,
              description,
          },
        
     
    ],
  };
}

const rows = books.map((post)=> 
  createData(post.name,  post.author, post.categories, post.price, post.createdAt, post.description),

);

  return (
  
   <div className="row">
     
     <div className="column">
       <div className="search">
        <input          
          placeholder="Podaj nr karty czytelnika..."
          onChange={(e) => setQuery1(e.target.value.toLowerCase())}
        />
        </div>
      <table>
      <tbody>
  {/*tylko jeden rekord do wyświetlenia*/}
        { data.slice(0,1).map((item) => (

          
<List
sx={{
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
}}
>
<ListItem>
  <ListItemAvatar>
    <Avatar>
    

      <PersonIcon/>
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Imię i Nazwisko" secondary={item.name} />
</ListItem>
<Divider variant="inset" component="li" />
<ListItem>
  <ListItemAvatar>
    <Avatar>
      <NumbersIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText primary="Numer karty" secondary={item.nrkarty} />
</ListItem>

<Divider variant="inset" component="li" />
 <Button  variant="contained"  style={{  width: '100%'}}
            onClick={() => handleDelete(item._id)}
          >Sprawdź</Button>
            
</List>
           
        
        
          
        ))}
      </tbody>
    </table>
    </div>
    <div className="column1">
      { books.length !== 0 ?
      <><Alert icon={false} severity="info">Wypożyczone książki </Alert> <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><b>Tytuł</b></TableCell>
            <TableCell align="right"><b>Autor</b></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer> </> : <Alert  icon={false} severity="success">Brak książek do oddania</Alert> }
    </div> 
    </div>
     
  );
 
}








 