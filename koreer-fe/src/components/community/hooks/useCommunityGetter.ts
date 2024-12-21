import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {deletePostAsync, getPostsAsync} from "../../../slice/postSlice";
import {PageResponse} from "@/types/common";
import {PostsDTO} from "@/types/post";

export function useCommunityGetter() {
    const dispatch = useDispatch<any>();
    const [posts, setPosts] = useState<PageResponse<PostsDTO>>();

    const getCompanyInfo = useCallback(async (page:number) => {
            try {
                const result: PageResponse<PostsDTO> = await dispatch(getPostsAsync(page)).unwrap();
                setPosts(result)
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );

    const deletePost = useCallback(async (postingIdx:number) => {
            try {
                const result = await dispatch(deletePostAsync(postingIdx)).unwrap();
                console.log(result)
                return result
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );
    return ({
        getCompanyInfo, posts, deletePost,

    });
}