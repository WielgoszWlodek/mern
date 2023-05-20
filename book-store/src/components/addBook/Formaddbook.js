import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../validation/Controls";
import { useForm, Form } from '../validation/useForm';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./addBook.css";

import {
    FormLabel,
    MenuItem,
     InputLabel,
    Select,
    TextField,
  } from "@mui/material";

const initialFValues = {
    id: 0,
    name: '',
    author: '',
    description: '', 
    price: '',
    categories: '', 
    image: '',
    //hireDate: new Date(),
   // isPermanent: false,
}

export default function Formaaddbook() {

    let url ="";
    const [file, setFile] = useState("");
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


    const history = useNavigate();

    const sendRequest = async () => { 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/diluld5bo/image/upload",  data);
    const { url } = uploadRes.data;
          
  await axios
          .post("/books", {
            name: String(values.name),
            author: String(values.author),
            description: String(values.description),
            price: Number(values.price),
            categories: Array(values.categories),
            image: String(url ? url : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" ) ,
          })
          .then((res) => res.data);
      };



    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "To pole jest wymagane."
            if ('name' in fieldValues)
            temp.name = fieldValues.name.length < 30 ? "" : "Za długi tytuł."
            if ('author' in fieldValues)
            temp.author = fieldValues.author ? "" : "To pole jest wymagane."
            if ('author' in fieldValues)
            temp.author = fieldValues.author.length < 30 ? "" : "Za długie imię."
            if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "To pole jest wymagane."
            if ('description' in fieldValues)
            temp.description = fieldValues.description.length  < 60? "" : "Za długi napis."
            if ('price' in fieldValues)
            temp.price = fieldValues.price.length === 4 ? "" : "Wymagane 4 cyfry."
            if ('categories' in fieldValues)
            temp.categories = fieldValues.categories.length !== 0 ? "" : "To pole jest wymagane."
            
    
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
        }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
           sendRequest().then(() => history("/mainpage"));
           resetForm()
        }
    }

    return (
        <div style={{ marginTop:"39px"}}>
        <Form onSubmit={handleSubmit}>
            <Grid container >
                <Grid item xs={6}>
                       <Controls.Input
                        name="name"
                        label="Tytuł"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                        <Controls.Input
                        name="author"
                        label="Autor"
                        value={values.author}
                        onChange={handleInputChange}
                        error={errors.author}
                    />
                        <Controls.Input
                        name="description"
                        label="Opis"
                        value={values.description}
                        onChange={handleInputChange}
                        error={errors.description}
                    />
            </Grid>
                   
        <Grid item xs={6}>
                     <Controls.Input
                        label="Nr. książki"
                        name="price"
                        type="number"
                        value={values.price}
                        onChange={handleInputChange}
                        error={errors.price}
                    />
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Kategorie"
                        onChange={handleInputChange}
                        value={values.categories}
                        name="categories"
                        error={errors.categories}
                    >

                       {cats.map((c) => (
                       <MenuItem key ={c._id} value={c.name} >
                        
                       {c.name } 
                       </MenuItem>
                       ))}
                   </TextField>


                    <InputLabel id="demo-select-small">Dodaj okładkę</InputLabel>
                       <img style={{  width: "70px", height: "70px"}}
                       src={
                       file
                       ? URL.createObjectURL(file)
                       : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                       }
                       alt=""
                       />
                       <label htmlFor="file">
                         <DriveFolderUploadOutlinedIcon className="icon" />
                       </label>
                       <input
                       type="file"
                       id="file"
                       onChange={(e) => setFile(e.target.files[0])}
                       style={{ display: "none" }}
                       name="image"
                       />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Dodaj książkę" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
              
            </Grid>
            </Grid>
        </Form>
        </div>
    )
}