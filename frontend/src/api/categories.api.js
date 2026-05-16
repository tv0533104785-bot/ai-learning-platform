import { apiRequest } from "./client";

export const getCategories=()=>
    apiRequest({
        path:"/categories/"
    });

export const getCategoryById=(categoryId)=>
    apiRequest({
        path:`/categories/${categoryId}`
    });

export const getSubCategories=(categoryId)=>
    apiRequest({
        path:`/sub-categories/by-category/${categoryId}`
    });