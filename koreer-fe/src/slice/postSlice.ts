import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {PostApi} from "../api/PostApi";
import {CreatePostDTO} from "../types/post";

export const createPostAsync = createAsyncThunk("user/createPost",
    (dto: CreatePostDTO) => executePromise(PostApi.createPost(dto))
);

export const getPostsAsync = createAsyncThunk("user/getPosts",
    () => executePromise(PostApi.getPosts())
);