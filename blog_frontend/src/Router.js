import React from "react";
import { BrowserRouter,Switch,Route} from "react-router-dom";
import SignUp from "./user/signup";
import SignIn from "./user/signin";
import Posts from "./core/page/Explore";
import Category from "./core/page/GetCategories";
import ViewPost from "./core/page/ViewPost";
import ViewCategory from "./core/page/ViewCategory";
import CreatePost from "./core/page/CreatePost";
import Profile from "./user/profile";
import UpdatePost from "./core/page/UpdatePost";
import Home from "./core/page/Home";
import {AuthenticatedRoute, NotAuthenticatedRoute} from "./privateRoute";
import NotFoundPage from "./core/page/404";

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <NotAuthenticatedRoute path="/register" exact component={SignUp}/>
                <NotAuthenticatedRoute path="/login" exact component={SignIn}/>
                <Route path="/post" exact component={Posts}/>
                <Route path="/category" exact component={Category}/>
                <AuthenticatedRoute path="/create-post" exact component={CreatePost} />
                <AuthenticatedRoute path="/profile" exact component={Profile} />
                <Route path="/update-post/:id" exact render={(props)=><UpdatePost {...props} />} />
                <Route path="/post/view/:id" exact render={(props) => <ViewPost {...props} />}/>
                <Route path="/category/view/:id" exact  render={(props)=><ViewCategory {...props}/>}/>
                <Route path="*" component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;