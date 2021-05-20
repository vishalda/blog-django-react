import React from "react";
import { BrowserRouter,Switch,Route, useParams} from "react-router-dom";
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Posts from "./core/Explore";
import App from "./App";
import Category from "./core/Category";
import ViewPost from "./core/ViewPost";
import ViewCategory from "./core/ViewCategory";

const Routes = () =>{
    //TODO: Try to load id directly to ViewCategory without this function 
    function GetId(){
        let id = useParams();
        return(
            <div>
                <ViewCategory idObjct={id} />
            </div>
        )
    }

    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App}/>
                <Route path="/register" exact component={SignUp}/>
                <Route path="/login" exact component={SignIn}/>
                <Route path="/post" exact component={Posts}/>
                <Route path="/category" exact component={Category}/>
                <Route path="/post/view/:id" exact render={(props) => <ViewPost {...props} />}/>
                <Route path="/category/view/:id" exact  component={GetId}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;