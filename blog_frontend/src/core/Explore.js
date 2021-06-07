import React from 'react';
import { PostCard } from "./Card";
import {getPost} from "./helper/coreApiCalls";
import Base from "./Base";
import CardColumns from 'react-bootstrap/CardColumns'
import "../SCSS/card.scss";
import Container from "react-bootstrap/Container"
import Alert from 'react-bootstrap/esm/Alert';

//Getting all posts
class Posts extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            error:false,
            loading:false,
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
        this.setState({loading:true})
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
            }else{
                this.setState({posts:data});
            }
            this.setState({loading:false})
        }).catch(err =>console.log(err))
    };

    //Display error message using state variable
    errorMessage = () =>{
        return(
            <Container>
                <Alert variant={'danger'} style={{display:this.state.error? "" : "none"}}>
                    {this.state.error}
                </Alert>
            </Container>
        );
    };

    //Function used to display Loader using state variable
    isLoading = () =>{
        return (
            this.state.loading && <div>...loading</div>
        );
    };

    render(){
        return(
            <div>
                <Base />
                <Container fluid>
                    {this.errorMessage()}
                    {this.isLoading()}
                    <CardColumns className='card-column'>
                        {this.state.posts.map((post,index) =>{
                            return(
                                <div key={index} className='post-card-div'>
                                    <PostCard post = {post} />
                                </div>
                            );
                        })}
                    </CardColumns>
                </Container>
            </div>
        );
    }
};

export default Posts;