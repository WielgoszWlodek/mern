import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "./Controls";
import { useForm, Form } from './useForm';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const initialFValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: 'male',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
}

export default function EmployeeForm() {

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
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName ? "" : "To pole jest wymagane."
            if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.length === 4 ? "" : "Wymagane 4 cyfry."
    
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
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="fullName"
                        label="Imię i nazwisko"
                        value={values.fullName}
                        onChange={handleInputChange}
                        error={errors.fullName}
                    />
                     <Controls.Input
                        label="Nr. karty"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}