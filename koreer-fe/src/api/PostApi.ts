import {MainApi} from "./MainApi";
import {CreatePostDTO} from "../types/post";

export class PostApi{
    static url = `${process.env.REACT_APP_BASE_URL}/community`;

    static createPost = (dto:CreatePostDTO) => () =>
        MainApi.api.post(`${PostApi.url}/post`, dto,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static getPosts = () => () =>
        MainApi.api.get(`${PostApi.url}/posts`);
}