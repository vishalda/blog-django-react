import { BrowserRouter,Switch,Route} from "react-router-dom";
import React from "react";
import SignUp from "./user/signup";
import App from "./App";

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/register" exact component={SignUp}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;