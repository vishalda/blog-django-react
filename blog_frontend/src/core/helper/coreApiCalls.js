import { API } from "../../backend";

export const getPost = () =>{
    return fetch(`${API}post/`,{method : `GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};

export const getCategory = () =>{
    return fetch(`${API}post/category/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};