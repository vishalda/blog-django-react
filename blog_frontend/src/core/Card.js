import React from 'react';

export const Card = ({post}) =>{
    //Getting all the info about the card
    const CardTitle = post ? post.title : "Card Title";
    const CardDescription = post ? post.description : "Card Description";
    const CardImage = post ? post.image : "/home/vishal/Pictures/01-28-2021-11.32.04.jpg";
    const CardAuthorName = post ? post.author.name : "Vishal";
    const CardAuthorUserName = post ? post.author.username : "VDA-001";
    
    return(
        <div className="Card" style={{width:"25%",border:"2px",borderBlockColor:"black"}}>
            <h1>{CardTitle}</h1>
            <h4>{CardDescription}</h4>
            <img src={CardImage} style={{width:"100%"}} alt=""/>
            <p>{CardAuthorName}</p>
            <p>{CardAuthorUserName}</p>
        </div>
    )
}