import { apiRequest } from "./client";

export const register=(data)=>apiRequest({
    path:"/auth/register",
    method:"POST",
    body:data,
});

export const login=(data)=>
    apiRequest({
        path:"/auth/login",
        method:"POST",
        body:data,
    });