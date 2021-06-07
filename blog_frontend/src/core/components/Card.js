import React from 'react';
import {useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import "../../SCSS/card.scss";

export const PostCard = ({post}) =>{
    //Getting all the info about the card
    const CardTitle = post ? post.title : "Card Title";
    const CardDescription = post ? post.description : "Card Description";
    const CardImage = post ? post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
    const CardCreatedAt = post ? post.created_at : "";
    const CardCategory = post.category ? post.category.title : "";
    const CardDate = CardCreatedAt.slice(0,10);
    const history = useHistory();

    //redirecting to view/:id to get detail of post
    function handleClick(){
        history.push(`/post/view/${post.id}`);
    };
    
    return(
        <Card onClick={() => handleClick()} className='post-card rounded-0'>
            <Card.Img variant="top" className='post-card-image' src={CardImage} />
            <Card.Body className='post-card-body'>
                <Card.Title>{CardTitle}</Card.Title>
                <Card.Text>
                    {CardDescription}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='post-card-footer'>
                <Card.Text>Category: {CardCategory}  &nbsp; &nbsp;Created:{CardDate}</Card.Text>
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
        <div onClick={() =>handleClick()} className="category-card">
            <Card style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title style={{fontSize:"30px"}} className="category-card-title">{CardTitle}</Card.Title>
                <Card.Text>
                {CardDescription}
                </Card.Text>
            </Card.Body>
            </Card>
        </div>
    );
};