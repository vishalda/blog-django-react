import React, { useState,useEffect } from 'react';
import { signup } from "../auth/helper/index";
import Base from "../core/components/Base";
import {RegisterPageSvg} from "../core/components/svg";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/esm/Alert';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { RiLockPasswordLine } from "react-icons/ri";
import { VscSymbolNamespace } from "react-icons/vsc";
import { GrUserNew } from "react-icons/gr";
import { HiOutlineMailOpen } from "react-icons/hi";
import "../SCSS/authentication.scss";

const SignUp = () =>{
    const [values, setValues] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        error:"",
        success: false,
        loading:false,
    });

    useEffect(()=>{

        //Toggling dark-theme
        if(localStorage.getItem('dark')==="true"){
            document.body.style.backgroundColor = "rgb(23,25,28)";
            document.body.style.color = "white";
        }else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    },[]);
    
    //Assigning all state values to the local variables
    const {name,email,username,password,success,error,loading} = values;

    //Updating each field of input after every change
    const handleChange = (name) =>(event) =>{
        setValues({...values,error:false,[name]:event.target.value});
    };

    //Function to handle register
    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        //Check if all fields are filled
        if(email==='' || username===''||password===''||name===''){
            setValues({...values,error:"Please fill in all the details",loading:false});
        }
        signup({name,email,username,password})
        .then(data =>{
            //Check if email in data is equal to the actual submitted email id
            if(data.email === email){
                setValues({
                    name:"",
                    email:"",
                    username:"",
                    password:"",
                    error:"",
                    success:true,
                    loading:false
                });
            }else{
                setValues({
                    ...values,
                    error:data.email,
                    success:false,
                    loading:false
                });
            }
        })
        .catch(err => console.log(err));
    };

    //Display success message using state variable
    const successMessage = () =>{
        return(
            <Container>
                <Alert variant={'success'} style={{display:success? "" : "none"}}>
                    New Account created successfully. Please <Alert.Link href="/login">Login</Alert.Link>.
                </Alert>
            </Container>
        );
    };

    //Display error message using state variable
    const errorMessage = () =>{
        return(
            <Container>
                <Alert variant={'danger'} style={{display:error? "" : "none"}}>
                    {error}
                </Alert>
            </Container>
        );
    };

    //Function used to display Loader using state variable
    const isLoading = () =>{
        return (
            loading && <Spinner animation="border" className="loader"/>
        );
    };

    const signupForm = () =>{
        return(
            <div className="authentication-page">
                <div className="svg-div">
                    <RegisterPageSvg className="register-svg"/><br/>
                </div>
                <h2 className="form-name">Register </h2>
                <Form className="authentication-form">
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
                    <Button type="submit" className="button" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
                <h5 className="change-page">Already have an account? <a href="/login" className="link">Login</a></h5>
            </div>
        );
    };

    return(
        <div>
            <Base />
            {errorMessage()}
            {successMessage()}
            {signupForm()}
            {isLoading()}
        </div>
    );
};

export default SignUp;