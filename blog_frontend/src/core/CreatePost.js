import React from 'react';
import {CreateNewPost, getCategory} from './helper/coreApiCalls';
import Base from "./Base";
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
            error:"",
        }
    }

    componentDidMount(){
        //Getting all the category list from backend and passing it to getOptions func
        getCategory()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error});
                console.log(this.state.error);
            }else{
                this.getOptions(data);
            }
        });
    }

    //Setting up the options field for Select tag
    getOptions(data){
        const option = data.map((d)=>({
            "value":d.id,
            "label":d.title,
        }));
        this.setState({category_options:option});
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
        //Loading State variables to normal varialbes
        const {title,description,body,image,category_id} = this.state;
        
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
                    <input value = {this.state.title} onChange={this.handleChange("title")} type="text" required/>
                    <li>description : </li>
                    <input value = {this.state.description} onChange={this.handleChange("description")} type="text" required/>
                    <li>body : </li>
                    <input value = {this.state.body} onChange={this.handleChange("body")} type="text" required/>
                    {/*Setting image value as this.state.image gives InvalidStateError */}
                    <input  value = {undefined} type="file" onChange={this.handleChange('image')} required/>
                    {/*Setting value using category_id -1 as the value of actual category_id starts from 1 */}
                    <Select value={this.state.category_options[this.state.category_id-1]} options={this.state.category_options} onChange={this.handleChange('category_id')} required/>
                    <button onClick={this.onSubmit}>submit</button>
                </form>
            </div>
        );
    };
};

export default CreatePost;