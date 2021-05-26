import { API } from "../../backend";
import {IsAuthenticated} from "../../auth/helper/index";

export const getPost = () =>{
    return fetch(`${API}post/`,{method : `GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const getCategory = () =>{
    return fetch(`${API}post/categories/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const getComments = (id) =>{
    return fetch(`${API}post/comment/${id}/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const getUserDetail = (id) =>{
    return fetch(`${API}user/${id}/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err=>console.log(err))
};

export const CreateComment = (author_id,post_id,content) =>{
    const formData = new FormData();
    formData.append('content',content);
    return fetch(`${API}post/create-comment/${author_id}/${post_id}/`,{
        method:`POST`,
        body:formData
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
}

export const ViewPostInDetail = (id) =>{
    return fetch(`${API}post/view/${id}/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const CreateNewPost = (postData) =>{
    //Getting userId by checking for Authentication
    let userId = IsAuthenticated() && IsAuthenticated().user.id;

    //Creating a new Form Data
    const formData = new FormData();
    for(const dataName in postData){
        formData.append(dataName,postData[dataName]);
    }

    return fetch(`${API}post/create-post/${userId}/`,{
        method:`POST`,
        body:formData,
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}; 