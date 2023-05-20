import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./Controls";
import { useForm, Form } from './useForm';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./addUser.css";



const initialFValues = {
    id: 0,
    name: '',
    email: '',
    nrkarty: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function UserForm() {

    const history = useNavigate();

    const sendRequest = async () => {
        await axios
          .post("users", {
            name: String(values.name),
            nrkarty: Number(values.nrkarty),
            
          })
          .then((res) => res.data);
      };

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "To pole jest wymagane."
            if ('name' in fieldValues)
            temp.name = fieldValues.name.length < 30 ? "" : "Za długie imię."
            if ('nrkarty' in fieldValues)
            temp.nrkarty = fieldValues.nrkarty.length === 4 ? "" : "Wymagane 4 cyfry."
    
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
           sendRequest().then(() => history("/users"));
            resetForm()
        }
    }

    return (
        <div className="addAbout1">
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={8}>
                    <Controls.Input
                        name="name"
                        label="Imię i nazwisko"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                     <Controls.Input
                        label="Nr. karty"
                        name="nrkarty"
                        value={values.nrkarty}
                        onChange={handleInputChange}
                        error={errors.nrkarty}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Dodaj czytelnika" />
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