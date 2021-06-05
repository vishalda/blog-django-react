import React from 'react';
import {CreateNewPost, getCategory} from './helper/coreApiCalls';
import Base from "./Base";
import Select from "react-select";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
    };

    render(){
        return(
            <div>
                <Base />
                <Container>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
                    <form>
                        <li>title : </li>
                        <input value = {this.state.title} onChange={this.handleChange("title")} type="text" required/>
                        <li>description : </li>
                        <input value = {this.state.description} onChange={this.handleChange("description")} type="text" required/>
                        <li>body : </li>
                        <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            onReady={ editor => {} }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                this.setState({body:data})
                            } }
                            onBlur={ ( event, editor ) => {} }
                            onFocus={ ( event, editor ) => {} }
                        />
                        {/*Setting image value as this.state.image gives InvalidStateError */}
                        <img src={this.state.imageViewer} alt="" style={{width:"500px"}}/>
                        <input  value = {undefined} type="file" onChange={this.handleChange('image')} required/>
                        {/*Setting value using category_id -1 as the value of actual category_id starts from 1 */}
                        <Select value={this.state.category_options[this.state.category_id-1]} options={this.state.category_options} onChange={this.handleChange('category_id')} required/>
                        <button onClick={this.onSubmit}>submit</button>
                    </form>
                </Container>
                
            </div>
        );
    };
};

export default CreatePost;