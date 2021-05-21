import React from 'react';
import {CreateNewPost} from './helper/coreApiCalls';
import Base from "./Base";
import { API } from '../backend';
import Select from "react-select";

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description:"",
            body:"",
            image:null,
            category_options:[],
            category_id:"",
        }
    }

    componentDidMount(){
        this.getOptions();
    }

    async getOptions(){
        const res = fetch(`${API}post/categories/`,{
            method:`GET`,
        });
        const data =res.data;
        const options = data.map((d)=>({
            "value":d.id,
            "label":d.title,
        }));

        this.setState({category_options:options});
    }

    handleCategoryChange(e){
        this.setState({category_id:e.value});
    }

    handleImageChange = (e) =>{
        this.setState({
            image:e.target.files[0]
        })
    };

    handleChange = (e) => {
        this.setState({[e.target.id]:e.target.value} )
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const {title,description,body,image,category_options,category_id} = this.state;
        CreateNewPost({title,description,body,image,category_id})
        .then(response =>{
            console.log(response);
        })
        .catch(err=>{
            console.log(err);
        });
    };

    render(){
        return(
            <div>
                <Base />
                <form>
                    <li>title : </li>
                    <input value = {this.state.title} onChange={this.handleChange()} type="text"/>
                    <li>description : </li>
                    <input value = {this.state.description} onChange={this.handleChange()} type="text"/>
                    <li>body : </li>
                    <input value = {this.state.body} onChange={this.handleChange()} type="text"/>
                    <input value = {this.state.image} onChange={this.handleImageChange()} type="file" />
                    <Select options={this.state.category_options} onChange={this.handleCategoryChange.bind(this)} />
                    <button onClick={this.onSubmit}>submit</button>
                </form>
            </div>
        );
    };
};

export default CreatePost;