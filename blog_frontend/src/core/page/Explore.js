import React from 'react';
import {getPost} from "../helper/coreApiCalls";
import Base from "../components/Base";
import { PostCard } from "../components/Card";
import Spinner from 'react-bootstrap/Spinner';
import CardColumns from 'react-bootstrap/CardColumns';
import Container from "react-bootstrap/Container";
import Alert from 'react-bootstrap/esm/Alert';
import "../../SCSS/card.scss";

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

        //Toggling dark-theme
        if(localStorage.getItem('dark')==="true"){
            document.body.style.backgroundColor = "rgb(23,25,28)";
            document.body.style.color = "white";
        }else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
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
            this.state.loading && <Spinner animation="border" className="loader"/>
        );
    };

    render(){
        return(
            <div className="explore wrapUp-card-elements">
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