import React from 'react';
import { Redirect } from "react-router";
import Select from "react-select";
import { MdDescription,MdTitle } from "react-icons/md";
import {CreateNewPost, getCategory} from '../helper/coreApiCalls';
import Spinner from 'react-bootstrap/Spinner';
import Base from "../components/Base";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/esm/Alert';
import "../../SCSS/createPost.scss";

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
            success:false,
            loading:false,
            doRedirect:false,
        }
    }

    componentDidMount(){
        //Getting all the category list from backend and passing it to getOptions func
        this.setState({loading:true})
        getCategory()
        .then(data =>{
            if(data.error){
                this.setState({error:data.error,loading:false});
            }else{
                this.getOptions(data);
            }
            this.setState({loading:false});
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
            //Changing only image field
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
        this.setState({loading:true})
        const {title,description,body,image,category_id} = this.state;
        //Check if all fields are filled
        if(title===''||description===''||body===''||image===''||category_id===''){
            this.setState({error:"Please fill in all the details",loading:false})
        }else{
            CreateNewPost({title,description,body,image,category_id})
            .then(response =>{
                //changing all states to null
                this.setState({
                    title:"",
                    description:"",
                    body:"",
                    image:"",
                    imageViewer:"",
                    category_options:[],
                    category_id:"",
                    error:"",
                    doRedirect:true,
                    loading:false,
                })
            })
            .catch(err=>{
                this.setState({
                    error:err
                })
            });
        }        
    };

    //Display success message using state variable
    successMessage = () =>{
        return(
            <Container>
                <Alert variant={'success'} style={{display:this.state.success? "" : "none"}}>
                    New Post created successfully. View <Alert.Link href="/profile">Post</Alert.Link>.
                </Alert>
            </Container>
        );
    };

    //Display error message using state variable
    errorMessage = () =>{
        return(
            <Container>
                <Alert variant={'danger'} style={{display:this.state.error? "" : "none"}}>
                    {this.state.error}
                </Alert>
            </Container>
        );
    };

    performRedirect = () =>{
        if(this.state.doRedirect){
            return <Redirect to="/profile" />;
        }
    };

    //Function used to display Loader using state variable
    isLoading = () =>{
        return (
            this.state.loading && <Spinner animation="border" className="loader"/>
        );
    };

    render(){
        return(
            <div className="create-post">
                <Base />
                <br/>
                {this.errorMessage()}
                {this.successMessage()}
                {this.isLoading()}
                {this.performRedirect()}
                <Container className="create-post-contents">
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
                    <Button className="button" type="submit" onClick={this.onSubmit}>
                        Submit
                    </Button>
                    </Form>
                </Container>
                
            </div>
        );
    };
};

export default CreatePost;