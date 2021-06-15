import React from 'react';
import { Link } from 'react-router-dom';
import { IsAuthenticated } from '../auth/helper/index';
import { getPost, getUserDetail } from '../core/helper/coreApiCalls';
import { PostCard } from '../core/components/Card';
import Base from '../core/components/Base';
import Container from 'react-bootstrap/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner'
import '../SCSS/profile.scss';

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

    //Loading all posts
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

    //Function to redirect to update-post
    handleClick = (id) =>{
        console.log(id);
        return(
            <Link to={`/update-post/${id}`} />
        );
    }

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
                    <Container fluid className="wrapUp-card-elements">
                        <CardColumns className='card-column'>
                        {this.state.checkPost && this.state.filteredPost.map((post,index)=>{
                            return(
                                <div key={index} className="post-card-div">
                                    <PostCard post = {post} />
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