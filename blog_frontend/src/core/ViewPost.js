import React from 'react';
import { IsAuthenticated } from '../auth/helper';
import {CreateComment, getComments, getUserDetail, ViewPostInDetail} from "./helper/coreApiCalls";

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
        };
    }

    componentDidMount(){
        this.loadPostInDetail(this.props.match.params.id);
    }
    componentWillUnmount(){
        clearInterval(this.state.error,this.state.post)
    }

    loadPostInDetail(userId){
        //Getting the full data of that particular post using its id 
        ViewPostInDetail(userId)
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({post:data})
            }
        })
        .catch(err => console.log(err))
    }

    loadComments = (postId) =>(e) =>{
        e.preventDefault();
        getComments(postId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({
                    comments:data.comments,
                })
                if(this.state.viewComments){
                    this.setState({viewComments:false})
                }else{
                    this.setState({viewComments:true})
                }
            }
        })
        .catch(err=>console.log(err))
    }

    loadUserDetailOfComment = (author_id)=>{
        getUserDetail(author_id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({UserDetail:data})
                return(<p>{this.state.UserDetail.username}</p>);
            }
        })
        .catch(err=>console.log(err))
    }

    handleChange = (name) => (e) =>{
        this.setState({[name]:e.target.value});
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const post_id = this.state.post.id;
        const author_id = IsAuthenticated() && IsAuthenticated().user.id;
        const content = this.state.content;
        //Check for null comments
        if(content!==""){
            CreateComment(author_id,post_id,content)
            .then(data=>{
                this.setState({content:""})
            })
            .catch(err=> console.log(err))
        }
        this.loadComments(this.state.post.id);
    }

    createMarkup = () => {
        return { __html: this.state.post.body};
    }

    render(){
        const Title = this.state.post ? this.state.post.title : "Title";
        const Description = this.state.post ? this.state.post.description : "Description";
        const Image = this.state.post ? this.state.post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
        const AuthorName = this.state.post.author ? this.state.post.author.name : "Vishal";
        const AuthorUserName = this.state.post.author ? this.state.post.author.username : "VDA-001";
        //View post in detail

        return(
            <div>
                <h1>{Title}</h1>
                <h4>{Description}</h4>
                <div dangerouslySetInnerHTML={this.createMarkup()} className="editor"></div>
                <img src={Image} alt="" style={{width:"500px"}}/>
                <p>{AuthorName}</p>
                <p>{AuthorUserName}</p>
                <input type="text" value={this.state.content} name="comment" onChange={this.handleChange('content')}/>
                <button onClick={this.onSubmit}>Submit Comment</button>
                <button onClick={this.loadComments(this.state.post.id)}>Comments</button>
                {this.state.viewComments && this.state.comments.map((comment,index) =>{
                    return(
                        <div key={index}>
                            <hr />
                            <h4>{ comment.content}</h4>
                            {/*//TODO: Get detail of owner of the comment*/}
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default ViewPost;