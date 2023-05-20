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
  import "./Book.css";
  import React, { useEffect, useState } from "react";
  import { useNavigate, useParams } from "react-router-dom";
  import { useLocation } from "react-router";
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const Backbook = () => {
    const location = useLocation();
      const path = location.pathname.split("/")[2];
     
    const [like, setLike] = useState();
    const [isLiked, setIsLiked] = useState(false);

    const likeHandler = () => {
      try {
        axios.put("/books/" + path + "/like", { userId: "635da6f8bc384203da0bcefd" });
      } catch (err) {}
      setLike(isLiked ? "Książka została wypożyczona" : "Ksiaża oddana.");
      setIsLiked(!isLiked);
    };


    const [inputs, setInputs] = useState();
    const id = useParams().id;
   const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(() => {
      const fetchHandler = async () => {
        await axios
          .get(`http://localhost:5000/books/${id}`)
          .then((res) => res.data)
          .then((data) => setInputs(data.book));
      };
      fetchHandler();
    }, [id]);
  
    const sendRequest = async () => {
      await axios
        .put(`http://localhost:5000/books/${id}`, {
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
      sendRequest().then(() => history("/books"));
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
              marginTop={10}
            >
              
             <FormLabel>Tytuł: {inputs.name}</FormLabel>
             <FormLabel>Autor: {inputs.author}</FormLabel>
         

<FormLabel>Kategoria: {inputs.categories}</FormLabel>


              <FormLabel>Opis: {inputs.description}</FormLabel>
              
              <FormLabel>Numer katalogu: {inputs.price}</FormLabel>
              
              <FormLabel>Pożycz: </FormLabel>
              <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
          <span className="postLikeCounter">{like}</span>
  
              <Button variant="contained" type="submit">
                Zmień dane książki
              </Button>
            </Box>
          </form>
        )}

      </div>
    );
  };
  
  export default Backbook;










  