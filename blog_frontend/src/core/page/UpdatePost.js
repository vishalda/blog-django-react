import React from 'react';
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom';
import Base from '../components/Base';
import {ChangePostTextField, ChangePostImage, ViewPostInDetail} from '../helper/coreApiCalls';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { MdDescription,MdTitle } from "react-icons/md";
import Container from 'react-bootstrap/esm/Container';
import Alert from 'react-bootstrap/esm/Alert';
import Spinner from 'react-bootstrap/Spinner';
import "../../SCSS/updatePost.scss";
import { IsAuthenticated } from '../../auth/helper';

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
            doRedirect:true,
            loading:false,
        }
    }

    componentDidMount(){
        this.loadPost(this.props.match.params.id);

        

        //Toggling dark-theme
        if(localStorage.getItem('dark')==="true"){
            document.body.style.backgroundColor = "rgb(23,25,28)";
        }else{
            document.body.style.backgroundColor = "white";
        }
    }

    //Load all data of the post to the state variables
    loadPost(id){
        this.setState({loading:true})
        ViewPostInDetail(id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                if(!IsAuthenticated()){
                    console.log(IsAuthenticated().user.id);
                    <Redirect to = '/p' />
                    this.performRedirect();
                }
        
                if(parseInt(data.author.id) !== parseInt(IsAuthenticated().user.id)){
                    console.log(IsAuthenticated().user.id, data.author.id);
                    this.performRedirect();
                }
                this.setState({
                    title:data.title,
                    description:data.description,
                    body:data.body,
                    image:data.image,
                    imageViewer:data.image,
                    id:data.id,
                })
            }
            this.setState({loading:false})
        })
        .catch(err=>this.setState({error:err}))
    }

    //Function to handle change in any of the input
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
        if(this.state.doRedirect){
            return <Redirect to="/login" />;
        }
    };

    //Function to handle title,description,body submit
    onSubmit = (e) =>{
        e.preventDefault();
        this.setState({loading:true})
        const {title,description,body} = this.state;
        ChangePostTextField(this.state.id,{title,description,body})
        .then(data=>{
            this.setState({success:true,loading:false});
        })
        .catch(err=>this.setState({error:err}));
    };

    //Function to handle image submit
    onSubmitImage = (e) =>{
        e.preventDefault();
        this.setState({loading:true})
        const image=this.state.image;
        ChangePostImage(this.state.id,{image})
        .then(data=>{
            this.setState({success:true,loading:false});
        })
        .catch(err=>this.setState({error:err}));
    };

    //Display success message using state variable
    successMessage = () =>{
        return(
            <Container>
                <Alert variant={'success'} style={{display:(this.state.success && !this.state.error)? "" : "none"}}>
                    Post updated successfully. Go back to <Alert.Link href="/profile">Profile</Alert.Link>.
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

    //Function used to display Loader using state variable
    isLoading = () =>{
        return (
            this.state.loading && <Spinner animation="border" className="loader"/>
        );
    };

    render(){
        return(
            <div className="update-post">
                <Base />
                <Container className="update-post-contents">
                    {this.errorMessage()}
                    {this.successMessage()}
                    {this.isLoading()}
                    <Form>
                        <Form.Label className={localStorage.getItem('dark')==="true" ? "form-label-dark" : "form-label-light"}>Title:</Form.Label>
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
                        <Form.Label className={localStorage.getItem('dark')==="true" ? "form-label-dark" : "form-label-light"}>Description:</Form.Label>
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
                        <Form.Label className={localStorage.getItem('dark')==="true" ? "form-label-dark" : "form-label-light"}>Body:</Form.Label>
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
                        <Button className="button" type="submit" onClick={this.onSubmit}>
                            Save Changes
                        </Button> 
                        <Button variant="outline-danger danger-button" type="submit">
                            <Link to={`/post/view/${this.props.match.params.id}`} className="cancel-button-link">Cancel</Link>
                        </Button>                       
                        <br/>
                        <br/>
                        <hr/>
                        <img src={this.state.imageViewer} alt="" className="view-image" />
                        <Form.File className={localStorage.getItem('dark')==="true" ? "form-label-dark" : "form-label-light"} id="exampleFormControlFile1" label="Change Image" value = {undefined} type="file" onChange={this.handleChange('image')}/><br/>
                        <Button className="button" type="submit" style={{marginBottom:'40px',marginLeft:'0'}}onClick={this.onSubmitImage}>
                            Change Image
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
};

export default UpdatePost;