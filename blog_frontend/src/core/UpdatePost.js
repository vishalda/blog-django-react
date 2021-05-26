import React from 'react';
import { Redirect } from 'react-router';
import Base from './Base';
import {ChangePost, ViewPostInDetail} from './helper/coreApiCalls';

class UpdatePost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            body:"",
            image:"",
            error:false,
        }
    }

    componentDidMount(){
        this.loadPost(this.props.match.params.id);
    }

    loadPost(id){
        ViewPostInDetail(id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({
                    title:data.title,
                    description:data.description,
                    body:data.body,
                    image:data.image,
                })
            }
        })
        .catch(err=>console.log(err))
    }

    handleChange = (name) =>(event) =>{
        if(name==='image'){
            this.setState({[name]:event.target.files[0]})
        }else{
            this.setState({[name]:event.target.value})
        }
    }

    performRedirect = () =>{
        return <Redirect to="/profile" />;
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const data = [this.state.title,this.state.description,this.state.body,this.state.image];
        ChangePost(this.props.id,data)
        .then(data=>{
            console.log(data)
        })
        .catch(err=>console.log(err))
    }

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
                        <img src={this.state.image} alt="" />
                        <input  value = {undefined} type="file" onChange={this.handleChange('image')}/>
                        <button onClick={this.onSubmit}>Save changes</button>
                        <button onClick={this.performRedirect}>cancel</button>
                </form>
            </div>
        );
    }
};

export default UpdatePost;