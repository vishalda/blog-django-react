import React from 'react';
import { IsAuthenticated } from '../../auth/helper';
import {CreateComment, getComments, getUserDetail, ViewPostInDetail} from "../helper/coreApiCalls";
import Base from '../components/Base';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';
import {FaRegComments} from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { MdDateRange } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import Alert from 'react-bootstrap/esm/Alert';
import Container from 'react-bootstrap/esm/Container';
import "../../SCSS/viewPost.scss";

class ViewPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            post:[],
            comments:[],
            viewComments:false,
            UserDetail:[],
            content:"",
            show:false,
            loading:false,
        };
    }

    //Function to close comments modal
    handleClose = () =>{
        this.setState({show:false,error:""})
    }

    //Function to open comments modal
    handleShow = () =>{
        this.setState({show:true})
    }

    componentDidMount(){
        this.loadPostInDetail(this.props.match.params.id);

        //Toggling dark-theme
        if(localStorage.getItem('dark')==="true"){
            document.body.style.backgroundColor = "rgb(23,25,28)";
            document.body.style.color = "white";
        }else{
            document.body.style.backgroundColor = "white";
            document.body.style.color = "black";
        }
    }
    componentWillUnmount(){
        clearInterval(this.state.error,this.state.post)
    }

    loadPostInDetail(userId){
        //Getting the full data of that particular post using its id 
        this.setState({loading:true})
        ViewPostInDetail(userId)
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({post:data})
            }
            this.setState({loading:false})
        })
        .catch(err => this.setState({error:err}))
    }

    //Loading comments of particular post
    loadComments = (postId)  =>{
        this.setState({loading:true})
        getComments(postId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({
                    comments:data.comments,
                    viewComments:!this.state.viewComments
                })
            }
            this.setState({loading:false})
        })
        .catch(err=>this.setState({error:err}))
    }

    //Loading detail of particular user of particular comment
    loadUserDetailOfComment = (author_id)=>{
        this.setState({loading:true})
        getUserDetail(author_id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({UserDetail:data})
                return(<p>{this.state.UserDetail.username}</p>);
            }
            this.setState({loading:false})
        })
        .catch(err=>this.setState({error:err}))
    }

    handleChange = (name) => (e) =>{
        this.setState({[name]:e.target.value});
    }

    //Handling submit of new comment
    onSubmit = (e) =>{
        this.handleClose();
        if(!IsAuthenticated()){
            this.setState({error:"Please login to add a comment"});
        }
        this.setState({loading:true})
        e.preventDefault();
        const post_id = this.state.post.id;
        const author_id = IsAuthenticated() && IsAuthenticated().user.id;
        const content = this.state.content;
        //Check for null comments
        if(content!==""){
            CreateComment(author_id,post_id,content)
            .then(data=>{
                this.setState({content:"",loading:false})
                this.loadPostInDetail(this.props.match.params.id)
            })
            .catch(err=> this.setState({error:err}))
        }
    }

    //A simple function to handle call of two different functions
    referenceFunction=()=>{
        this.loadComments(this.state.post.id);
        this.handleShow();
    }

    //Formating all the data in the body in the form of text 
    createMarkup = () => {
        return { __html: this.state.post.body};
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
        const Title = this.state.post ? this.state.post.title : "Title";
        const Description = this.state.post ? this.state.post.description : "Description";
        const Image = this.state.post ? this.state.post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
        const AuthorName = this.state.post.author ? this.state.post.author.name : "Vishal";
        const AuthorUserName = this.state.post.author ? this.state.post.author.username : "VDA-001";
        const AuthorId = this.state.post.author ? parseInt(this.state.post.author.id) : 0;
        const numberOfComments = this.state.post ? this.state.post.number_of_comments : "0";
        let CreatedAt = this.state.post ? String(this.state.post.created_at).slice(0,10) : "";
        console.log(AuthorId);
        
        //View post in detail
        return(
            <div className="view-post">
                <Base />
                {this.errorMessage()}
                {this.isLoading()}
                <div className="sticky-top left-div large-view-div">
                    <iframe src={`https://robohash.org/${AuthorUserName}`} className="left-div-image" title="large-view-user-profile-pic"></iframe>
                    <span>
                        <h5>@{AuthorUserName}</h5>
                        <h6>{AuthorName}</h6>
                    </span>
                    <br/>
                    <hr/>
                    <p ><FaRegComments className="icon" />:{numberOfComments}&nbsp; &nbsp;<MdDateRange className="icon" />{CreatedAt}</p>
                    <Button onClick={this.referenceFunction} className="button">Comments</Button><br/><br/>
                    {IsAuthenticated() && AuthorId===IsAuthenticated().user.id &&
                        <Button className="button" href={`/update-post/${this.state.post.id}`}>Update this Post</Button>
                    }
                </div>
                <div className="fixed-bottom small-view-div">
                    <Button onClick={this.referenceFunction} className="button comments-button"><FaRegComments className="icon" /></Button>
                    {IsAuthenticated() && AuthorId===IsAuthenticated().user.id &&
                        <Button className="button" href={`/update-post/${this.state.post.id}`}><GrDocumentUpdate className="icon" /></Button>
                    }
                </div>
                <Modal show={this.state.show} scrollable={true} onHide={this.handleClose} className="view-comments text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Comments</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body">{this.state.comments.map((comment,index) =>{
                        return(
                            <div key={index}>
                                <p>{ comment.content}</p>
                                <hr />
                                {/*//TODO: Get detail of owner of the comment*/}
                            </div>
                        );
                    })}</Modal.Body>
                    <Modal.Footer>
                    <InputGroup>
                        <FormControl
                        placeholder="Create Comment"
                        aria-label="Create Comment"
                        aria-describedby="basic-addon2"
                        value={this.state.content} 
                        name="comment" 
                        onChange={this.handleChange('content')}
                        />
                        <InputGroup.Append>
                        <Button className="button" onClick={this.onSubmit}>Create</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </Modal.Footer>
                </Modal>
                <Container className="post-detail">
                    <h1>{Title}</h1>
                    <h4 className="description">{Description}</h4>
                    <hr/>
                    <img src={Image} alt=""/>
                    <br /><br />
                    <div dangerouslySetInnerHTML={this.createMarkup()} className="editor"></div>
                    <hr />
                    <div className="small-view-user-info-div">
                        <iframe src={`https://robohash.org/${AuthorUserName}`} className="left-div-image" title="small-view-user-profile-pic"></iframe>
                        <span>
                            <h5>@{AuthorUserName}</h5>
                            <h6>{AuthorName}</h6>
                        </span>
                        <p ><FaRegComments className="icon" />:{numberOfComments}&nbsp; &nbsp;<MdDateRange className="icon" />{CreatedAt}</p>
                    </div>
                </Container>
            </div>
        );
    }
};

export default ViewPost;