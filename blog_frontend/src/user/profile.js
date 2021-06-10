import React from 'react';
import { getPost, getUserDetail } from '../core/helper/coreApiCalls';
import { PostCard } from "../core/components/Card";
import Base from "../core/components/Base";
import { IsAuthenticated } from '../auth/helper/index';
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import "../SCSS/profile.scss";
import Alert from 'react-bootstrap/Alert';
import "../SCSS/loader.scss";
import Spinner from 'react-bootstrap/Spinner'

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:[],
            checkPost:false,
            filteredPost:[],
            error:false,
            loading:false,
        }
    }

    componentDidMount(){
        //Getting the user details and his/her posts
        this.loadUserDetail();
        this.loadPosts();
    }

    loadUserDetail(){
        //Getting authenticated users id
        this.setState({loading:true})
        const userId = IsAuthenticated() && IsAuthenticated().user.id;
        getUserDetail(userId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({user:data})
            }
            this.setState({loading:false})
        })
        .catch(err=>this.setState({error:err}))
    }

    loadPosts(){
        this.setState({loading:true})
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                //Filtering the data to get current authenticated users posts
                let filteredData = data.filter((post) =>{
                    if(post.author.id === this.state.user.id){
                        return post;
                    }
                }) || [];
                if(filteredData!=null){
                    this.setState({filteredPost:filteredData,checkPost:true})
                }
            }
            this.setState({loading:false})
        })
    };

    handleClick = (id) =>{
        console.log(id);
        return(
            <Link to={`/update-post/${id}`} />
        );
    }

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
            <div className="profile">
                <Base />
                {this.errorMessage()}
                {this.isLoading()}
                {!this.isLoading() && 
                <div>
                    <Container className="detail-block">
                        <iframe src={`https://robohash.org/${this.state.user.username}`} className="profile-pic"></iframe>
                        <h5 className="user-detail" id="username">@{this.state.user.username}</h5>
                        <h3 className="user-detail" id="name">{this.state.user.name}</h3>
                        <p className="user-detail" id="description">{this.state.user.description}</p>
                        <p className="user-detail">Joined: {String(this.state.user.created_at).slice(0,10)}</p>
                    </Container>
                    <br/>
                    <hr/>
                    <Container fluid>
                        <CardColumns className='card-column'>
                        {this.state.checkPost && this.state.filteredPost.map((post,index)=>{
                            return(
                                <div key={index} className="post-card-div">
                                    <PostCard post = {post} />
                                    <Button className="update-button" href={`/update-post/${post.id}`}>Update this Post</Button>
                                </div>
                            ) 
                        })}
                        </CardColumns>
                    </Container>    
                </div>}
                
            </div>
        );
    }
};

export default Profile;