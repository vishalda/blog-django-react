import React, {useEffect, useState} from 'react';
import { Card } from "./Card";
import {getPost} from "./helper/coreApiCalls";
import Base from "./Base";

export default function Posts(){
    const [posts , setPost ] = useState([]);
    const [error, setError ] =useState(false);

    const loadAllPost = () =>{
        getPost()
        .then(data =>{
            if(data.error){
                setError(data.error);
                console.log(error);
            }else{
                setPost(data);
            }
        });
    };

    useEffect (() => {
        loadAllPost();
    }, [] );

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