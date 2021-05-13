import { API } from "../../backend"

export const signup = (user) =>{
    return fetch(`${API}user/`,{
        method : "POST",
        headers :{
            Accept : "application/json",
            "content-type":"application/json"
        },
        body: JSON.stringify(user),
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};