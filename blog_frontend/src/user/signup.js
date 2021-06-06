import React, { useState } from 'react';
import { signup } from "../auth/helper/index";
import Base from "../core/Base";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "../SCSS/authentication.scss";
import InputGroup from 'react-bootstrap/InputGroup';
import { RiLockPasswordLine } from "react-icons/ri";
import { VscSymbolNamespace } from "react-icons/vsc";
import { GrUserNew } from "react-icons/gr";
import { HiOutlineMailOpen } from "react-icons/hi";

const SignUp = () =>{
    const [values, setValues] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        error:"",
        success: false,
    });
    
    //Assigning all state values to the local variables
    const {name,email,username,password,success,error} = values;

    //Updating each field of input after every change
    const handleChange = (name) =>(event) =>{
        setValues({...values,error:false,[name]:event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false});
        signup({name,email,username,password})
        .then(data =>{
            //TODO: Need to remove later
            console.log("Data",data);
            if(data.email === email){
                setValues({
                    name:"",
                    email:"",
                    username:"",
                    password:"",
                    error:"",
                    success:true,
                });
            }else{
                setValues({
                    ...values,
                    error:true,
                    success:false,
                });
            }
        })
        .catch(err => console.log(err));
    };

    //Display success message using state variable
    const successMessage = () =>{
        return(
            <div style={{display:success? "" : "none"}}>
                New account created successfully
            </div>
        );
    };

    //Display error message using state variable
    const errorMessage = () =>{
        return(
            <div style={{display:error? "" : "none"}}>
                Error occurred
            </div>
        );
    };

    const signupForm = () =>{
        return(
            <div className="authentication-form">
                <h2>Register form:</h2><br/>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><HiOutlineMailOpen /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Email address"
                            type="email"
                            value = {email} 
                            onChange={handleChange("email")}
                            />
                        </InputGroup>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><VscSymbolNamespace /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Enter Username"
                            type="text"
                            value = {username} 
                            onChange={handleChange("username")}
                            />
                        </InputGroup>
                        <Form.Label>Name</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><GrUserNew /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Enter Name"
                            type="text"
                            value = {name} 
                            onChange={handleChange("name")}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Enter password"
                            type="password"
                            value = {password} 
                            onChange={handleChange("password")}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        );
    };

    return(
        <div>
            <Base />
            {errorMessage()}
            {successMessage()}
            {signupForm()}
        </div>
    );
};

export default SignUp;