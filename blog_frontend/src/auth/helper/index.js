import { API } from "../../backend"


export const signup = (user) =>{
    return fetch(`${API}user/`,{
        method : "POST",
        headers :{
            Accept : "application/json",
            "Content-Type":"application/json",
        },
        body: JSON.stringify(user),
    })
    .then(response =>{
        return response.json();
    })
    .catch(err => console.log(err));
};

export const signin = (user) =>{
    const formData = new FormData();

    for(const name in user){
        formData.append(name,user[name]);
    }

    for(var key of formData.keys()){
        console.log("KEYS", key);
    }

    return fetch(`${API}user/login/`,{
        method:"POST",
        body:formData,
    })
    .then(response=>{
        console.log("Success",response);
        return response.json();
    })
    .catch(err=>console.log(err));
};

export const Authenticat =(data,next) =>{
    if(typeof window!==undefined){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
};

export const IsAuthenticated = () =>{
    if(typeof window === undefined){
        return false;
    }else{
        if(localStorage.getItem("jwt")){
            return JSON.parse(localStorage.getItem("jwt"));
        }else{
            return false;
        }
    }
}

export const signout = () =>{
    var userId = IsAuthenticated() && IsAuthenticated().user.id;
    console.log("Success");
    if(typeof window !==undefined){
        localStorage.removeItem("jwt");
        return fetch(`${API}user/logout/${userId}/`,{
            method:`GET`,
        })
        .then(response => console.log("Logged out successfully"))
        .catch(err => console.log(err));
    };
};