import {MainApi} from "./MainApi";
import {UserPostDTO} from "../types/signup";

export class SignupApi{
    // static baseUrl = `${MainApi.urlPrefix}/users`;
    static baseUrl = `${process.env.REACT_APP_BASE_URL}/users`;

    static createUser = (user:UserPostDTO) => () =>
        MainApi.api.post(`${SignupApi.baseUrl}`, user);

    static duplicateCheck = (email:string) => () =>
        MainApi.api.get(`${SignupApi.baseUrl}/dupl-check/${email}`);
}