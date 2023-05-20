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
  
  const Giveback = () => {
  
    
  
  
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
      <div className="card">
        {inputs && (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              maxWidth={600}
              alignContent={"center"}
              alignSelf="center"
              marginLeft={"auto"}
              marginRight="auto"
              marginTop={-20}
            >
              
             <FormLabel>{inputs.name}</FormLabel>
          
       
  
  
  
    
              <FormLabel>Numer karty: {inputs.nrkarty}</FormLabel>
        
        
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                }
                label="Oddaj"
              />
  
              <Button variant="contained" type="submit">
                Oddaj książkę
              </Button>
            </Box>
          </form>
        )}
      </div>
    );
  };
  
  export default Giveback;