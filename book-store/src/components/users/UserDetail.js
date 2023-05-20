import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {




  const [inputs, setInputs] = useState();
  const id = useParams().id;
 const [checked, setChecked] = useState(false);
  const history = useNavigate();
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
     
        nrkarty: Number(inputs.nrkarty),
    
        available: Boolean(checked),
      
      })
      .then((res) => res.data);
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/users"));
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="card1">
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            maxWidth={300}
            alignContent={"center"}
            alignSelf="center"
            marginLeft={10}
           
            marginTop={-20}
          >
            
           <FormLabel>Tytuł</FormLabel>
            <TextField
              value={inputs.name}
              onChange={handleChange}
              margin="normal"
              fullWidth
              variant="outlined"
              name="name"
            />
     



  
            <FormLabel>Numer katalogu</FormLabel>
            <TextField
              value={inputs.nrkarty}
              onChange={handleChange}
              type="number"
              margin="normal"
              fullWidth
              variant="outlined"
              name="nrkarty"
            />
      
            {/*
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              label="Wypożycz"
            />
            */}
            <Button variant="contained" type="submit">
              Zmień dane czytelnika
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default UserDetail;