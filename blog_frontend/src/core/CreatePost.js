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

    getOptions(){
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
        const options = [
            { value: '0', label: 'Chocolate' },
            { value: '1', label: 'Strawberry' },
            { value: '2', label: 'Vanilla' },
        ];
        this.setState({category_options:options});
        console.log(this.state.category_options);
    }

    handleChange =(name) => (e) => {
        if(name === 'image'){
            this.setState({[name]:e.target.files[0]})
        }else if(name === 'category_id'){
            this.setState({[name]:e.value});
        }else{
            this.setState({[name]:e.target.value})
        }
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
                    <input value = {this.state.title} onChange={this.handleChange("title")} type="text"/>
                    <li>description : </li>
                    <input value = {this.state.description} onChange={this.handleChange("description")} type="text"/>
                    <li>body : </li>
                    <input value = {this.state.body} onChange={this.handleChange("body")} type="text"/>
                    <input  value = {undefined} type="file" onChange={this.handleChange('image')}/>
                    <Select value={this.state.category_options[this.state.category_id]} options={this.state.category_options} onChange={this.handleChange('category_id')} />
                    <button onClick={this.onSubmit}>submit</button>
                </form>
            </div>
        );
    };
};

export default CreatePost;