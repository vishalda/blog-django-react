import React from 'react';
import { PostCard } from "./Card";
import {getPost} from "./helper/coreApiCalls";
import Base from "./Base";
import CardColumns from 'react-bootstrap/CardColumns'
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
        }).catch(err =>console.log(err))
    };

    render(){
        return(
            <div>
                <Base />
                <CardColumns style={{margin:"0px 0px 0px 20px"}}>
                    {this.state.posts.map((post,index) =>{
                        return(
                            <div key={index}>
                                <PostCard post = {post} />
                            </div>
                        );
                    })}
                </CardColumns>
            </div>
        );
    }
};

export default Posts;