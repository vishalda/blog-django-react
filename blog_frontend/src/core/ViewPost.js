import React from 'react';
import {ViewPostInDetail} from "./helper/coreApiCalls";

class ViewPost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            post:[],
        }
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
            </div>
        );
    }
};

export default ViewPost;