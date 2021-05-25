import React from 'react';
import {getComments, getUserDetail, ViewPostInDetail} from "./helper/coreApiCalls";

class ViewPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            post:[],
            comments:[],
            viewComments:false,
            UserDetail:[]
        };
        this.loadUserDetailOfComment=this.loadUserDetailOfComment.bind(this);
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
                console.log(this.state.comments);
            }
        })
        .catch(err=>console.log(err))
    }

    loadUserDetailOfComment = (author_id)=>{
        console.log(author_id);
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

    render(){
        const Title = this.state.post ? this.state.post.title : "Title";
        const Description = this.state.post ? this.state.post.description : "Description";
        const Image = this.state.post ? this.state.post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
        const AuthorName = this.state.post.author ? this.state.post.author.name : "Vishal";
        const AuthorUserName = this.state.post.author ? this.state.post.author.username : "VDA-001";
        const Body = this.state.post ? this.state.post.body : "Body";

        return(
            <div>
                <h1>{Title}</h1>
                <h4>{Description}</h4>
                <p>{Body}</p>
                <img src={Image} alt="" />
                <p>{AuthorName}</p>
                <p>{AuthorUserName}</p>
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