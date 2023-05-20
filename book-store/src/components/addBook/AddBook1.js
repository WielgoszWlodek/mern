import {
    Button,
    Checkbox,
    FormControlLabel,
    FormLabel,
    TextField,
    MenuItem,
    Typography,
    InputLabel,
    Select,
  } from "@mui/material";
  import { Box } from "@mui/system";
  import axios from "axios";
  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import "./addBook.css";
  import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


  
  const AddBook1 = () => {
   
    const history = useNavigate();
    const [inputs, setInputs] = useState({
      name: "",
      description: "",
      price: "",
      author: "",
      image: "",
      categories: "",
    
    });


    //"https://api.cloudinary.com/v1_1/diluld5bo/image/upload",


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


    
    
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      // console.log(e.target.name, "Value", e.target.value);
    };
  
  

let url ="";
    const [file, setFile] = useState("");

  
    const handleSubmit = async (e) => {
      e.preventDefault();
     
      

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
      try {
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/diluld5bo/image/upload",  data);
  
        const { url } = uploadRes.data;
        console.log(uploadRes.data);
        console.log(url);
  
        const newUser = {
           img: url,
        };
   
    await axios
        .post("/books", {
          name: String(inputs.name),
          author: String(inputs.author),
          description: String(inputs.description),
          price: Number(inputs.price),
          image: String(url),
          categories: Array(inputs.categories),
        
        })
        .then((res) => res.data)
        .then(() => history("/mainpage"));
       
      } catch (err) {
        console.log(err);
      }

      
    };
 
    return (
      <div className="addBook">
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
          marginTop={2}
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
<InputLabel id="demo-select-small">Kategoria</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={inputs.categories}
        onChange={handleChange}
        name="categories"
      >

{cats.map((c) => (
<MenuItem  key ={c._id} value={c.name}> {c.name}</MenuItem>
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
          <FormLabel>Numer</FormLabel>
          <TextField
            value={inputs.price}
            onChange={handleChange}
            type="number"
            margin="normal"
            fullWidth
            variant="outlined"
            name="price"
          />
               <img style={{  width: "100px",
          height: "100px"}}
    
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
           <label htmlFor="file">
           <FormLabel>Dodaj okładkę</FormLabel>
 <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
           <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
      
  
          <Button variant="contained" type="submit">
            Dodaj książkę
          </Button>
        </Box>
      </form>
      </div>
    );
  };
  
  export default AddBook1;