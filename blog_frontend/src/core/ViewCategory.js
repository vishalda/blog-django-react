import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Base from './Base';
import { PostCard } from './Card';
import {getPost} from './helper/coreApiCalls';
import CardColumns from 'react-bootstrap/CardColumns'

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
        //accessing the id in props which was sent in the routers
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
                const filteredData = data.filter((post) => post.category.id === parseInt(id))
                this.setState({posts:filteredData});
            }
        }).catch(err =>console.log(err))
    }

    render(){
        return(
            <div>
                <Base />
                <Container fluid>
                    <CardColumns className='card-column'>
                        {this.state.posts.map((post,index) =>{
                            return(
                                <div key={index} className='post-card-div'>
                                    <PostCard post={post} />
                                </div>
                            );
                        })}
                    </CardColumns>
                </Container>
            </div>
        );
    }
}

export default ViewCategory;