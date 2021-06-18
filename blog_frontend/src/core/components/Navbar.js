import React,{useState,useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {signout,IsAuthenticated} from "../../auth/helper/index";
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../../SCSS/base.scss";

const Menu = () =>{

    const [darkTheme,setTheme] = useState({
        darkTheme:false
    });

    useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(darkTheme.darkTheme))
    })

    return(
        <div className="navbar-div">
            <Navbar sticky="top" collapseOnSelect expand="lg" className={localStorage.getItem('dark')==="true" ? "navbar dark-theme" : "navbar"}>
                <Navbar.Brand href="/" className="logo">Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto" activeKey="/home">
                        <Nav.Link href="/" activeKey="/home" className="nav-ele">Home</Nav.Link>
                        <Nav.Link href="/post" className="nav-ele">Explore</Nav.Link>
                        <Nav.Link href="/category" className="nav-ele">Category</Nav.Link>
                        {!IsAuthenticated() && 
                            <>
                                <Nav.Link href="/register" className="nav-ele">Register</Nav.Link>
                                <Nav.Link href="/login" className="nav-ele">Login</Nav.Link>
                            </>
                        }
                        {IsAuthenticated() && 
                        <>
                            <Nav.Link href="/create-post" className="nav-ele" >Create-Post</Nav.Link>
                            <Nav.Link href="/"onClick={()=>signout()} className="nav-ele">Logout</Nav.Link>
                            <Nav.Link href="/profile" className="nav-ele">Profile</Nav.Link>
                        </>}
                        <Button className="toggle-theme" onClick={()=>{
                            setTheme({darkTheme:!darkTheme.darkTheme})
                            console.log(darkTheme)
                        }}>Darktheme</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withRouter(Menu);