import React, {useState} from "react";
import { Redirect } from "react-router";
import {signin,Authenticat,IsAuthenticated} from "../auth/helper/index";
import Base from "../core/components/Base";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import "../SCSS/authentication.scss";
import InputGroup from 'react-bootstrap/InputGroup';
import { RiLockPasswordLine } from "react-icons/ri";
import { VscSymbolNamespace } from "react-icons/vsc";
import { HiOutlineMailOpen } from "react-icons/hi";
import Alert from 'react-bootstrap/Alert';
import Container from "react-bootstrap/Container";
import "../SCSS/loader.scss";
import Spinner from 'react-bootstrap/Spinner';
import {LoginPageSvg} from "../core/components/svg";

const SignIn = () =>{

    const [values,setValues] = useState({
        email:"",
        username:"",
        password:"",
        error:"",
        success:false,
        loading:false,
        didRedirect:false
    });

    const {email,username,password,error,success,loading} = values;

    const handleChange = (name) => (event) =>{
        setValues({...values,error:false,[name]:event.target.value});
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values,error:false,loading:true});
        if(email==='' || username===''||password===''){
            setValues({...values,error:"Please fill in all the details",loading:false});
        }else{
            signin({email,username,password})
            .then(data=>{
                //TODO: remove later
                console.log("DATA :",data);
                if(data.token){
                    //Setting up the jwt in localstorage
                    Authenticat(data, ()=>{
                        console.log("Tokken added");
                        setValues({
                            ...values,
                            didRedirect:true,
                        });
                    });
                }else{
                    setValues({...values,loading:false,error:data.error});
                }
            })
            .catch(err =>setValues({error:err}));
        }
    };

    const successMessage = () =>{
        return(
            <div style={{display:success? "" : "none"}}>
                New account created successfully
            </div>
        );
    };

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

    //Performing redirect after successfull login 
    const performRedirect = () =>{
        if(IsAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    const signinForm = () =>{
        return(
            <div className="authentication-page">
                <div className="svg-div">
                    <LoginPageSvg />
                </div>
                <h2 className="form-name">Login</h2>
                <Form className="authentication-form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <InputGroup className="mb-3" required>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><HiOutlineMailOpen /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Email address"
                            type="email"
                            value = {email} 
                            required
                            onChange={handleChange("email")}
                            />
                        </InputGroup>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <InputGroup className="mb-3" required>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><VscSymbolNamespace /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Enter Username"
                            type="text"
                            value = {username} 
                            required
                            onChange={handleChange("username")}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" required>
                        <Form.Label>Password</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><RiLockPasswordLine /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Enter password"
                            type="password"
                            value = {password} 
                            required
                            onChange={handleChange("password")}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form>
                <h5 className="change-page">Don't have an account? Create one at <a href="/register">Register</a></h5>
            </div>
        );
    }

    return(
        <div>
            <Base />
            {successMessage()}
            {errorMessage()}
            {isLoading()}
            {performRedirect()}
            {signinForm()}
        </div>
    )
};

export default SignIn;