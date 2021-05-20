import React from 'react';
import Base from './Base';
import { PostCard } from './Card';
import {getPost} from './helper/coreApiCalls';

class ViewCategory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            posts:[],
            filteredPost:[],
        }
    }

    componentDidMount(){
        this.loadRelatedPost(this.props.idObjct.id);
    }
    componentWillUnmount(){
        clearInterval(this.state.error,this.state.posts);
    }
    
    loadRelatedPost(id){
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
                console.log(this.state.error);
            }else{
                let dataArray = [];
                for(var i in data){
                    dataArray.push({name:i, value:data[i]})
                }
                const filteredData = dataArray.filter((post) => post.value.category.id === parseInt(id))
                console.log(filteredData);
                this.setState({posts:filteredData});
            }
        }).catch(err =>console.log(err))
    }

    render(){
        return(
            <div>
                <Base />
                {this.state.posts.map((post,index) =>{
                    return(
                        <div key={index}>
                            <PostCard post={post} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ViewCategory;