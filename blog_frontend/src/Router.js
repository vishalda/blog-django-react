import React from "react";
import { BrowserRouter,Switch,Route, useParams} from "react-router-dom";
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Posts from "./core/Explore";
import App from "./App";
import Category from "./core/GetCategories";
import ViewPost from "./core/ViewPost";
import ViewCategory from "./core/ViewCategory";
import CreatePost from "./core/CreatePost";
import Profile from "./user/profile";
import UpdatePost from "./core/UpdatePost";

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
                <Route path="/create-post" exact component={CreatePost} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/update-post/:id" exact render={(props)=><UpdatePost {...props} />} />
                <Route path="/post/view/:id" exact render={(props) => <ViewPost {...props} />}/>
                <Route path="/category/view/:id" exact  component={GetId}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;