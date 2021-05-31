import React from 'react';
import { Redirect } from 'react-router';
import Base from './Base';
import {ChangePostTextField, ChangePostImage, ViewPostInDetail} from './helper/coreApiCalls';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class UpdatePost extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:"",
            description:"",
            body:"",
            image:"",
            id:"",
            imageViewer:"",
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
                    imageViewer:data.image,
                    id:data.id,
                })
            }
        })
        .catch(err=>console.log(err))
    }

    handleChange = (name) =>(event) =>{
        if(name==='image'){
            this.setState({
                imageViewer:URL.createObjectURL(event.target.files[0]),
                image:event.target.files[0],
            })
            console.log(this.state.image);
        }else{
            this.setState({[name]:event.target.value})
        }
    }

    performRedirect = () =>{
        return <Redirect to="/profile" />;
    };

    onSubmit = (e) =>{
        e.preventDefault();
        const {title,description,body} = this.state;
        console.log({title,description,body});
        ChangePostTextField(this.state.id,{title,description,body})
        .then(data=>{
            console.log(data)
        })
        .catch(err=>console.log(err))
    }

    onSubmitImage = (e) =>{
        e.preventDefault();
        const image=this.state.image;
        ChangePostImage(this.state.id,{image})
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
                        <CKEditor
                            editor={ ClassicEditor }
                            data={this.state.body}
                            onReady={ editor => {} }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({body:data})
                            } }
                            onBlur={ ( event, editor ) => {} }
                            onFocus={ ( event, editor ) => {} }
                        />
                        <button onClick={this.onSubmit}>Save changes</button>
                        <button onClick={this.performRedirect}>cancel</button>
                        <br/>
                        <br/>
                        <img src={this.state.imageViewer} alt="" style={{width:"500px"}}/>
                        <input type="file" onChange={this.handleChange('image')}/>
                        <button onClick={this.onSubmitImage}>Change Image</button>
                </form>
            </div>
        );
    }
};

export default UpdatePost;