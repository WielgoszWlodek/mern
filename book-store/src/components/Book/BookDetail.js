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
  
  const BookDetail = () => {

   const [inputs, setInputs] = useState();
   const id = useParams().id;
   const [checked, setChecked] = useState(false);
   const history = useNavigate();
    useEffect(() => {
      const fetchHandler = async () => {
        await axios
          .get(`/books/${id}`)
          .then((res) => res.data)
          .then((data) => setInputs(data.book));
      };
      fetchHandler();
    }, [id]);
  
    const sendRequest = async () => {
      await axios
        .put(`/books/${id}`, {
          name: String(inputs.name),
          author: String(inputs.author),
          description: String(inputs.description),
          price: Number(inputs.price),
          image: String(inputs.image),
          categories: String(inputs.categories),
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
      sendRequest().then(() => history("/mainpage"));
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
              maxWidth={700}
              alignContent={"center"}
              alignSelf="center"
              marginLeft={"auto"}
              marginRight="auto"
              marginTop={0}
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
             <FormLabel>Autor</FormLabel>
              <TextField
                value={inputs.author}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="author"
              />

<FormLabel>Kategoria</FormLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={inputs.categories}
        onChange={handleChange}
        name="categories"
      >

<MenuItem value={""}>Brak kategori</MenuItem>
{cats.map((c) => (
<MenuItem  key ={c._id} value={c.name}> {c.name}<br/></MenuItem>
))}
      </Select>

              <FormLabel>Opis</FormLabel>
              <TextField
                value={inputs.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="description"
              />
              <FormLabel>Numer katalogu</FormLabel>
              <TextField
                value={inputs.price}
                onChange={handleChange}
                type="number"
                margin="normal"
                fullWidth
                variant="outlined"
                name="price"
              />
              <FormLabel>Okładka</FormLabel>
              <TextField
                value={inputs.image}
                onChange={handleChange}
                margin="normal"
                fullWidth
                variant="outlined"
                name="image"
              />
         
  
              <Button variant="contained" type="submit">
                Zmień dane książki
              </Button>
            </Box>
          </form>
        )}
      </div>
    );
  };
  
  export default BookDetail;