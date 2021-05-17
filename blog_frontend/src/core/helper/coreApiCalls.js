import { API } from "../../backend";

export const getPost = () =>{
    return fetch(`${API}post/`,{method : `GET`})
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err))
};