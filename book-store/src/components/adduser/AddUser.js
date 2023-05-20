import {
  Button,
  FormLabel,
  TextField,
  Box,
 
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./addUser.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

//https://www.youtube.com/watch?v=4YLa9iuN43c
 //"https://api.cloudinary.com/v1_1/diluld5bo/image/upload"

const AddUser = () => {
 
 const[cats, setCats]= useState([]);

  //pobieram kategorie. Potrzebne do wyświetlenia dropbox
  useEffect(()=>{
  const getCats = async ()=>{
    const res = await axios.get("/categories")
    setCats(res.data)
  }
  getCats()
 },[]);
// koniec


//<label>Gatunki</label>
//<select name="type"  onChange={(e) => setQuery(e.target.value.toLowerCase())}>
//<option value="">Wszystkie</option>
//{cats.map((c) => (
 //   <option key={c.id} value={c.id}>
   //   {c.name}
    //</option>
  //))}
//</select>


  
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    nrkarty: "",
    });

  const [checked, setChecked] = useState(true);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.name, "Value", e.target.value);
  };


  const sendRequest = async () => {
    await axios
      .post("/users", {
        name: String(inputs.name),
        nrkarty: Number(inputs.nrkarty),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };
//https://learnjsx.com/category/4/posts/nextjs-materialui-validate-textfield
  const handleSubmit = (e) => {
    e.preventDefault();
    //sendRequest().then(() => history("/users"));
 };


  return (
    <div className="addBook">
       <Box
       component="form"
       sx={{
       '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
       >


       <FormLabel>Imię i nazwisko</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
       />
     
       <FormLabel>Nr karty</FormLabel>
        <TextField
          value={inputs.nrkarty}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="nrkarty"
       />
        
        <Button variant="contained" type="submit"  onClick={handleSubmit}>
          Dodaj książkę
        </Button>
      </Box>
   //https://github.com/nishant-666/React-Form-Validation-/tree/master/src
    </div>
  );
};

export default AddUser;