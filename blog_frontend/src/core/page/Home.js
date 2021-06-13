import Base from '../components/Base';
import React from 'react';
import {HomePageSvg} from "../components/svg";
import "../../SCSS/home.scss";
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router';
import { BsHeartFill } from "react-icons/bs";
import { AiFillGithub,AiFillInstagram,AiFillLinkedin } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";

class Home extends React.Component{
    performRedirect=()=>{
        return <Redirect to='/create-post' />;
    }
    render(){
        return(
            <div className="home">
                <Base/>
                <div className="home-page-content">
                    <h1>Welcome!</h1>
                    <h4>A simple Blog which has basic CRUD functionality for editing posts.<br/><br/>Source code : <a href='https://github.com/VDA-001/blog-django-react'><FaGithubSquare style={{color:'rgb(31, 31, 31)'}}/></a><br/><br/> Interested in publishing a new post?</h4>
                    <Button className="button" onClick={this.performRedirect()}>Create-Post</Button>
                </div>
                <div className="home-page-svg"><HomePageSvg/></div>
                <div className="footer">
                    <h5 style={{position:'relative',float:'left'}}>Made with <BsHeartFill style={{color:'red'}}/>  by Vishal</h5>
                    <h5 style={{position:'relative',float:'right'}}>Connect with me : <a href='https://github.com/VDA-001'><AiFillGithub className="icons"/></a><a href='https://www.instagram.com/_v_ishhh_/'><AiFillInstagram className="icons"/></a><a href='https://www.linkedin.com/in/vishal-da-9216091a9/'><AiFillLinkedin className="icons"/></a></h5>
                </div>
            </div>
        );
    }
};

export default Home;