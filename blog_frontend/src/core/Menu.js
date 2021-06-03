import React from 'react';
import {withRouter} from 'react-router-dom';
import {signout,IsAuthenticated} from "../auth/helper/index";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

const Menu = () =>{
    return(
        <div>
            <Navbar sticky="top" collapseOnSelect expand="lg">
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end" activeKey="/home">
                        <Nav.Link href="/" activeKey="/home">Home</Nav.Link>
                        {!IsAuthenticated() && 
                            <>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        }
                        <Nav.Link href="/post">Explore</Nav.Link>
                        <Nav.Link href="/category">Category</Nav.Link>
                        {IsAuthenticated() && 
                        <>
                            <Nav.Link href="/create-post" >Create-Post</Nav.Link>
                            <Nav.Link href="/"onClick={()=>signout()}>Logout</Nav.Link>
                            <Nav.Link href="/profile">Profile</Nav.Link>
                        </>}
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default withRouter(Menu);