import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Base from '../components/Base';
import { PostCard } from '../components/Card';
import {getPost} from '../helper/coreApiCalls';
import CardColumns from 'react-bootstrap/CardColumns';
import Alert from 'react-bootstrap/esm/Alert';
import "../../SCSS/loader.scss";
import "../../SCSS/category.scss";
import Spinner from 'react-bootstrap/Spinner'

class ViewCategory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            posts:[],
            filteredPost:[],
            loading:false,
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
        this.setState({loading:true})
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
            }else{
                const filteredData = data.filter((post) => post.category.id === parseInt(id));
                this.setState({posts:filteredData});
            }
            this.setState({loading:false})
        }).catch(err =>this.setState({error:err}))
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
            <div className="view-category">
                <Base />
                <Container fluid>
                    {this.errorMessage()}
                    {this.isLoading()}
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