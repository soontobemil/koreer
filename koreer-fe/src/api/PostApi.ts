import {CreatePostDTO} from "@/types/post";
import {MainApi} from "../api/MainApi";

export class PostApi{
    static url = `${process.env.REACT_APP_BASE_URL}/community`;

    static createPost = (dto:CreatePostDTO) => () =>
        MainApi.api.post(`${PostApi.url}/post`, dto,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static getPosts = (page:number) => () =>
        MainApi.api.get(`${PostApi.url}/posts?page=${page}`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    static deletePost = (postingIdx:number) => () =>
        MainApi.api.delete(`${PostApi.url}/post/${postingIdx}/delete`,{
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
}