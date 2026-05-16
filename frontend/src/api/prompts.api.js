import { apiRequest } from "./client"

export const createPrompt=(data,token)=>
    apiRequest({
        path:"/prompts/",
        method:"POST",
        body:data,
        token,
    });

export const getMyPrompts=(token)=>
    apiRequest({
        path:"/prompts/me",
        token,
    });