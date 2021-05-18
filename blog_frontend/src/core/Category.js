import React from 'react';
import {getCategory} from "./helper/coreApiCalls";
import Base from "./Base";
import { CategoryCard } from "./Card";

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
                {this.state.categories.map((category,index) =>{
                    return(
                        <div key={index}>
                            <CategoryCard category = {category} />
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Category;