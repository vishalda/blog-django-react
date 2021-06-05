import React from 'react';
import {getCategory} from "./helper/coreApiCalls";
import Base from "./Base";
import { CategoryCard } from "./Card";
import Container from 'react-bootstrap/esm/Container';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            error:false,
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
        getCategory()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
                console.log(this.state.error);
            }else{
                this.setState({categories:data});
            }
        });
    };

    render(){
        return(
            <div>
                <Base />
                <Container>
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