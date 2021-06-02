import React from 'react';
import {useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "../SCSS/cardsStructure.scss";

export const PostCard = ({post}) =>{
    //Getting all the info about the card
    const CardTitle = post ? post.title : "Card Title";
    const CardDescription = post ? post.description : "Card Description";
    const CardImage = post ? post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
    const CardAuthorName = post.author ? post.author.name : "Vishal";
    const CardAuthorUserName = post.author ? post.author.username : "VDA-001";
    const history = useHistory();

    //redirecting to view/:id to get detail of post
    function handleClick(){
        history.push(`/post/view/${post.id}`);
    };
    
    return(
        <Card className="post-card" style={{ width: '27rem'}} >
            <Card.Img variant="top" src={CardImage} />
            <Card.Body>
                <Card.Title>{CardTitle}</Card.Title>
                <Card.Text>
                    {CardDescription}
                </Card.Text>
                <Button variant="primary" onClick={() => handleClick()}>Go somewhere</Button>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small><br />
                <small className="text-muted">{CardAuthorName}</small><br />
                <small className="text-muted">{CardAuthorUserName}</small><br />
            </Card.Footer>
        </Card>
    );
};

export const CategoryCard =({category}) =>{
    const CardTitle = category ? category.title : "Card Title";
    const CardDescription = category ? category.description : "Card Description";
    const history = useHistory();

    //Onclick view the posts under particular category
    function handleClick(){
        history.push(`/category/view/${category.id}`);
    };

    return(
        <div onClick={() =>handleClick()} className="Card" style={{width:"25%",border:"2px solid black"}}>
            <h1>{CardTitle}</h1>
            <h4>{CardDescription}</h4>
        </div>
    );
};