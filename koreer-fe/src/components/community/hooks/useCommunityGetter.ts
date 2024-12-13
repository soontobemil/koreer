import {useDispatch} from "react-redux";
import {useCallback, useState} from "react";
import {getPostsAsync} from "../../../slice/postSlice";
import {PageResponse} from "../../../types/common";
import {PostsDTO} from "../../../types/post";

export function useCommunityGetter() {
    const dispatch = useDispatch<any>();
    const [posts, setPosts] = useState<PageResponse<PostsDTO>>();

    const getCompanyInfo = useCallback(async () => {
            try {
                const result: PageResponse<PostsDTO> = await dispatch(getPostsAsync()).unwrap();
                setPosts(result)
            } catch (e){
                console.log(e)
            }
        },
        [dispatch]
    );
    return ({
        getCompanyInfo, posts
    });
}