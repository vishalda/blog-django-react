import React from "react";
import { BrowserRouter,Switch,Route} from "react-router-dom";
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Posts from "./core/Explore";
import App from "./App";

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/register" exact component={SignUp}/>
                <Route path="/login" exact component={SignIn}/>
                <Route path="/post" exact component={Posts}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;