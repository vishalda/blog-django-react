import React, {useEffect, useState, useCallback} from 'react';
import { Card } from "./Card";
import {getPost} from "./helper/coreApiCalls";
import Base from "./Base";

//Getting all posts
export default function Posts(){
    const [posts , setPost ] = useState([]);
    const [error, setError ] =useState(false);

    //function to load all products
    const loadAllPost = useCallback(() =>{
        getPost()
        .then(data =>{
            if(data.error){
                setError(data.error);
                console.log(error);
            }else{
                setPost(data);
            }
        });
    },[]);

    useEffect (() => {
        loadAllPost();
    }, [loadAllPost] );

    return(
        <div>
            <Base />
            {posts.map((post,index) =>{
                return(
                    <div key={index}>
                        <Card post = {post} />
                    </div>
                );
            })}
        </div>
    );
};