import {Verifier}  from "verifierjs/index";
console.log(Verifier)
export const Name = (value) => {
    
    return new Verifier(value).isUsername({username:/^[a-zA-Z]+$/}).details;
}
export const password = (value) => {
    
    return new Verifier(value).isLengthen("gt6").details;
}


export const email =(value)=>{
        return new Verifier(value).isUsername({username:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/}).details
}



