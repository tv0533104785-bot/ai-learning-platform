import { apiRequest } from "./client";

export const getUsers=(token)=>
    apiRequest({
        path:"/users/",
        token,
    });