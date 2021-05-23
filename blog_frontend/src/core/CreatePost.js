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
            image:"",
            category_options:[],
            category_id:"",
        }
    }

    componentDidMount(){
        this.getOptions();
    }

    async getOptions(){
        /*const res = fetch(`${API}post/categories/`,{
            method:`GET`,
        }).then(response =>{
            return response.json();
        }).catch(err=>console.log(err))
        const data = [];
        for(var i in res){
            data.push({name:i, value:res[i]});
        }
        const options = data.map((d)=>({
            "value":d.id,
            "label":d.title,
        }));*/
        const options = ["Technology",'BlockChain']

        this.setState({category_options:options});
    }

    handleCategoryChange(e){
        this.setState({category_id:e.value});
    }

    handleImageChange = (e) =>{
        this.setState({
            image:e.target.files[0]
        })
        console.log(e.target.files[0]);
        console.log(this.state.image);
    };

    handleChange =(name) => (e) => {
        this.setState({[name]:e.target.value} )
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const {title,description,body,image,category_options,category_id} = this.state;
        console.log(typeof(image));
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
                    <input value = {this.state.title} onChange={this.handleChange("title")} type="text"/>
                    <li>description : </li>
                    <input value = {this.state.description} onChange={this.handleChange("description")} type="text"/>
                    <li>body : </li>
                    <input value = {this.state.body} onChange={this.handleChange("body")} type="text"/>
                    <input type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageChange} value = {this.state.image}/>
                    <Select options={this.state.category_options} onChange={this.handleCategoryChange.bind(this)} />
                    <select name="id" onChange={this.handleCategoryChange.bind(this)}>
                        <option value={1}>Technology</option>
                        <option value={2}>BlockChain</option>
                        <option value={3}>Machine Learning</option>
                        <option value={5}>Flutter</option>
                    </select>
                    <button onClick={this.onSubmit}>submit</button>
                </form>
            </div>
        );
    };
};

export default CreatePost;