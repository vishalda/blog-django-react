import React from 'react';
import {CreateNewPost, getCategory} from './helper/coreApiCalls';
import Base from "./Base";
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { MdDescription,MdTitle } from "react-icons/md";
import { Redirect } from 'react-router';

class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            description:"",
            body:"",
            image:"",
            imageViewer:"",
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
            this.setState({
                imageViewer:URL.createObjectURL(e.target.files[0]),
                [name]:e.target.files[0],
            })
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
            this.setState({
                title:"",
                description:"",
                body:"",
                image:"",
                imageViewer:"",
                category_options:[],
                category_id:"",
                error:"",
            })
        })
        .catch(err=>{
            console.log(err);
        });
        <Redirect to='/profile' />
    };

    render(){
        return(
            <div>
                <Base />
                <br/>
                <Container>
                <Form>
                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1"><MdTitle /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            placeholder="Title..."
                            value = {this.state.title} 
                            onChange={this.handleChange("title")}
                            required
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
                            required
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
                        <img src={this.state.imageViewer} alt="" style={{width:"500px"}}/>
                        <Form.File id="exampleFormControlFile1" label="Upload an Image representing post" value = {undefined} type="file" onChange={this.handleChange('image')} required/><br/>
                        <Select value={this.state.category_options[this.state.category_id-1]} options={this.state.category_options} onChange={this.handleChange('category_id')} required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    </Form>
                </Container>
                
            </div>
        );
    };
};

export default CreatePost;