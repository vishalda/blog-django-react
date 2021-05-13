import React from 'react';
import {BrowserRouter as Router,Link} from 'react-router-dom';


const Menu = () =>{
    return(
        <div>
            <Router>
                <nav>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/post">explore</Link></li>
                    <li><Link to="/category">Category</Link></li>
                    <li><Link to="/create-post">Create-Post</Link></li>
                </nav>
            </Router>
        </div>
    );
};

export default Menu;