import React from 'react';
import { Card } from "./Card";
import {getPost} from "./helper/coreApiCalls";
import Base from "./Base";

//Getting all posts
class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            error:false,
        }; 
    }

    componentDidMount(){
        this.loadAllPost();
    }
    componentWillUnmount() {
        clearInterval(this.state.error,this.state.posts);  
    }

    //function to load all products
    loadAllPost (){
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
                console.log(this.state.error);
            }else{
                this.setState({posts:data});
            }
        });
    };

    render(){
        return(
            <div>
                <Base />
                {this.state.posts.map((post,index) =>{
                    return(
                        <div key={index}>
                            <Card post = {post} />
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default Posts;