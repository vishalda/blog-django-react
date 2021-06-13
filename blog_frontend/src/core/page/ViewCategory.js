import React from 'react';
import {getPost,getCategory} from '../helper/coreApiCalls';
import Base from '../components/Base';
import { PostCard } from '../components/Card';
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/esm/Container';
import CardColumns from 'react-bootstrap/CardColumns';
import Alert from 'react-bootstrap/esm/Alert';
import Jumbotron from 'react-bootstrap/Jumbotron';
import "../../SCSS/card.scss";

class ViewCategory extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:false,
            posts:[],
            filteredPost:[],
            loading:false,
            category:[],
        }
    }

    componentDidMount(){
        //accessing the id in props which was sent in the routers
        this.loadRelatedPost(this.props.match.params.id);
        this.loadCategoryInfo();
    }
    componentWillUnmount(){
        clearInterval(this.state.error,this.state.posts);
    }
    
    //Load the posts which are under the particular category
    loadRelatedPost(id){
        this.setState({loading:true})
        getPost()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
            }else{
                //filtering the posts to get related post
                const filteredData = data.filter((post) => post.category.id === parseInt(id));
                this.setState({posts:filteredData});
            }
            this.setState({loading:false})
        }).catch(err =>this.setState({error:err}))
    }

    //Loading the category information
    loadCategoryInfo (){
        this.setState({loading:true})
        getCategory()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
            }else{
                //Filtering out the category info to get detail of current category
                const CategoryInfo = data.filter((category) => category.id === parseInt(this.props.match.params.id));
                this.setState({category:CategoryInfo});
            }
            this.setState({loading:false});
        }).catch(err=>this.setState({error:err}))
    };

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
            <div className="view-category wrapUp-card-elements">
                <Base />
                <Container fluid>
                    {this.errorMessage()}
                    {this.isLoading()}
                    <Jumbotron fluid style={{margin:'0 5%',backgroundColor:'transparent'}}>
                        <Container>
                            {this.state.category.map((category,index)=>{
                                return(
                                    <>
                                        <h1>{category.title}</h1>
                                        <p>
                                            {category.description}
                                        </p>
                                    </>
                                )
                            })}
                        </Container>
                    </Jumbotron>
                    <hr/>
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