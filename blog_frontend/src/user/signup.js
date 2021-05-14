import React, { useState } from 'react';
import { signup } from "../auth/helper/index";
import Base from "../core/Base";

const SignUp = () =>{
    const [values, setValues] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        error:"",
        success: false,
    });
    
    const {name,email,username,password,success,error} = values;

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

    const successMessage = () =>{
        return(
            <div style={{display:success? "" : "none"}}>
                New account created successfully
            </div>
        );
    };

    const errorMessage = () =>{
        return(
            <div style={{display:error? "" : "none"}}>
                Error occurred
            </div>
        );
    };

    const signupForm = () =>{
        return(
            <div>
                <form>
                    <li>name : </li>
                    <input value = {name} onChange={handleChange("name")} type="text"/>
                    <li>email : </li>
                    <input value = {email} onChange={handleChange("email")} type="text"/>
                    <li>username : </li>
                    <input value = {username} onChange={handleChange("username")} type="text"/>
                    <li>password : </li>
                    <input value = {password} onChange={handleChange("password")} type="password"/>
                    <button onClick={onSubmit}>submit</button>
                </form>
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