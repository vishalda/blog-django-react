import React from 'react';
import { Redirect } from 'react-router';
import Base from './Base';
import {ChangePostTextField, ChangePostImage, ViewPostInDetail} from './helper/coreApiCalls';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { MdDescription,MdTitle } from "react-icons/md";
import Container from 'react-bootstrap/esm/Container';

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
                <Container>
                    <Form>
                        <Form.Label>Title:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><MdTitle /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Title..."
                            value = {this.state.title} 
                            onChange={this.handleChange("title")}
                            />
                        </InputGroup>
                        <Form.Label>Description:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><MdDescription /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Description..."
                            value = {this.state.description} 
                            onChange={this.handleChange("description")} 
                            />
                        </InputGroup>
                        <Form.Label>Body:</Form.Label>
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
                        /><br/>
                        <Button variant="outline-success" type="submit" style={{margin:'10px'}} onClick={this.onSubmit}>
                            Save Changes
                        </Button> 
                        <Button variant="outline-danger" type="submit" style={{margin:'10px'}} onClick={this.performRedirect}>
                            Cancel
                        </Button>                       
                        <br/>
                        <br/>
                        <hr/>
                        <img src={this.state.imageViewer} alt="" style={{width:"500px",borderRadius:'10px',marginBottom:'10px'}}/>
                        <Form.File id="exampleFormControlFile1" label="Change Image" value = {undefined} type="file" onChange={this.handleChange('image')}/><br/>
                        <Button variant="outline-success" type="submit" style={{marginBottom:'20px'}}onClick={this.onSubmitImage}>
                            Change Image
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
};

export default UpdatePost;