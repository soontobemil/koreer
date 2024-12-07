import {MainApi} from "./MainApi";
import {CreatePostDTO} from "../types/post";

export class PostApi{
    static url = `${process.env.REACT_APP_BASE_URL}/post`;

    static createPost = (dto:CreatePostDTO) => () =>
        MainApi.api.post(`${PostApi.url}/login`, dto);
}