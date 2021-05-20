import { API } from "../../backend";

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

export const ViewPostInDetail = (objct) =>{
    let id = objct.id;
    return fetch(`${API}post/view/${id}/`,{method:`GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};