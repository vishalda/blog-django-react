import React from 'react';
import { getPost, getUserDetail } from './helper/coreApiCalls';
import { PostCard } from "./Card";
import Base from "./Base";
import { IsAuthenticated } from '../auth/helper';

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:[],
            posts:[],
            checkPost:false,
            filteredPost:[],
            error:false,
        }
    }

    componentDidMount(){
        this.loadUserDetail();
        this.loadPosts();
    }

    loadUserDetail(){
        const userId = IsAuthenticated() && IsAuthenticated().user.id;
        getUserDetail(userId)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({user:data})
            }
        })
        .catch(err=>console.log(err))
    }

    loadPosts(){
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({posts:data})
            }
             let filteredData = this.state.posts.filter((post) =>{
                 if(post.author.id === this.state.user.id){
                     return post;
                 }
                 console.log(this.state.user);
                 console.log(post);
            });
            this.setState({filteredPost:filteredData,checkPost:true})
        })
    }

    render(){
        return(
            <div>
                <Base />
                <p>{this.state.user.username}</p>
                <p>{this.state.user.name}</p>
                <hr/>
                {this.state.checkPost && this.state.filteredPost.map((post,index)=>{
                    return(
                        <div key={index}>
                            <PostCard post = {post} />
                        </div>
                    )
                })}
            </div>
        );
    }
};

export default Profile;