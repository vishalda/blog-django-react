import React from 'react';
import {getCategory} from "../helper/coreApiCalls";
import Base from "../components/Base";
import { CategoryCard } from "../components/Card";
import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/esm/Alert';
import "../../SCSS/card.scss";
import Spinner from 'react-bootstrap/Spinner';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            error:false,
            loading:false,
        }; 
    }

    componentDidMount(){
        this.loadAllCategory();
    }
    componentWillUnmount() {
        clearInterval(this.state.error,this.state.categories);  
    }

    //function to load all products
    loadAllCategory (){
        this.setState({loading:true})
        getCategory()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
            }else{
                this.setState({categories:data});
            }
            this.setState({loading:false});
        });
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
            <div className="get-category wrapUp-card-elements">
                <Base />
                <Container>
                    {this.errorMessage()}
                    {this.isLoading()}
                    <h1 style={{margin:"20px"}}>Categories:</h1>
                    {this.state.categories.map((category,index) =>{
                        return(
                            <div key={index} style={{margin:"20px"}}>
                                <CategoryCard category = {category} />
                            </div>
                        );
                    })}
                </Container>
            </div>
        );
    }
}

export default Category;