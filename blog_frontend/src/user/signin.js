import React, {useState} from "react";
import { Redirect } from "react-router";
import {signin,Authenticat,IsAuthenticated} from "../auth/helper/index";
import Base from "../core/Base";

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
                setValues({...values,loading:false});
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

    //Function used to display Loader using state variable
    const isLoading = () =>{
        return (
            loading && <div>...loading</div>
        )
    }

    //Performing redirect after successfull login 
    const performRedirect = () =>{
        if(IsAuthenticated()){
            return <Redirect to="/" />;
        }
    };

    const signinForm = () =>{
        return(
            <div>
                <form>
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