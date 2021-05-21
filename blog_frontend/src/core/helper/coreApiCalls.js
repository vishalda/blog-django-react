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

export const ViewPostInDetail = (id) =>{
    return fetch(`${API}post/view/${id}/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const CreateNewPost = (postData) =>{
    let userId = IsAuthenticated() && IsAuthenticated().user.id;
    const formData = new FormData();
    for(const dataName in postData){
        formData.append(dataName,postData[dataName]);
    }
    //Output the keys to the console
    //TODO: Remove later
    for(var key of formData.keys()){
        console.log("KEYS", key);
    }
    return fetch(`${API}post/create-post/${userId}/`,{
        method:`POST`,
        body:formData
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
}; 