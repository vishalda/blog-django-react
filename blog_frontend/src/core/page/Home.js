import React from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import Base from '../components/Base';
import {HomePageSvg} from "../components/svg";
import { BsHeartFill } from "react-icons/bs";
import { AiFillGithub,AiFillInstagram,AiFillLinkedin } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";
import { RiSunFill,RiMoonFill } from "react-icons/ri";
import "../../SCSS/home.scss";
import { IsAuthenticated } from '../../auth/helper';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            darkTheme:false
        }
    }

    componentDidMount(){
        //Adding dark variable to localStorage if it doesn't exists
        if(localStorage.getItem('dark')===null){
            localStorage.setItem("dark", JSON.stringify(this.state.darkTheme));
        }

        //Toggling dark-theme
        if(localStorage.getItem('dark')==="true"){
            document.body.style.backgroundColor = "rgb(23,25,28)";
            document.body.style.color = "white";
        }else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    }

    render(){
        return(
            <div className={localStorage.getItem('dark')==="true" ? "home dark-theme-home" : "home"}>
                <Base/>
                <div className="home-page-svg"><HomePageSvg className="HomeSvg"/></div>

                <div className="home-page-content">
                    <h1>Welcome!</h1>
                    {IsAuthenticated() && 
                        <div><h4>A simple Blog which has basic CRUD functionality for editing posts.<br/><br/> Interested in publishing a new post? <Link to="/create-post" style={{color:'#6c63ff'}}>Create-Post</Link></h4><br/><br/></div>
                    }
                    {!IsAuthenticated() &&
                        <div><h4>A simple Blog which has basic CRUD functionality for editing posts.<br/><br/> Join us. <Link to="/register" style={{color:'#6c63ff'}}>Register</Link></h4><br/><br/></div>
                    }
                    <h5>
                        Source code : &nbsp;
                        <a href='https://github.com/VDA-001/blog-django-react'><FaGithubSquare className={localStorage.getItem('dark') === "true" ? "text-light github-icon" : "text-dark github-icon"}/></a>
                    </h5>
                    
                </div>
                <div className={localStorage.getItem('dark')==="true" ? "footer dark-theme-footer" : "footer"}>
                    <button className="toggle-theme-button" onClick={()=>{
                            this.setState({darkTheme:!this.state.darkTheme})
                            localStorage.setItem("dark",JSON.stringify(this.state.darkTheme));
                            if(localStorage.getItem('dark')==="true"){
                                document.body.style.backgroundColor = "rgb(23,25,28)";
                                document.body.style.color = "white";
                                document.body.style.transition = "0.2s";
                            }else{
                                document.body.style.backgroundColor = "white";
                                document.body.style.color = "black";
                                document.body.style.transition = "0.2s";
                            }
                            return(
                                <Redirect to="/" />
                            );
                        }}>{localStorage.getItem("dark")==="true" ? 
                            <RiSunFill style={{color:'white'}} className="theme-icon"/>
                         : <RiMoonFill style={{color:'black'}} className="theme-icon"/>}
                    </button>
                    <h5 style={{position:'relative',float:'left'}}>Made with <BsHeartFill style={{color:'red'}}/>  by Vishal</h5>
                    <h5 style={{position:'relative',float:'right'}}>Connect with me : <a href='https://github.com/VDA-001'><AiFillGithub className="icons"/></a><a href='https://www.instagram.com/_v_ishhh_/'><AiFillInstagram className="icons"/></a><a href='https://www.linkedin.com/in/vishal-da-9216091a9/'><AiFillLinkedin className="icons"/></a></h5>
                </div>
            </div>
        );
    }
};

export default Home;