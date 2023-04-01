//Este archivo nos ayudará a concatenar la url del api
import axios from "axios";

export const axiosBase = axios.create({
    baseURL: "http://localhost:3001/"
});