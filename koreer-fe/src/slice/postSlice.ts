import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CreatePostDTO} from "@/types/post";
import {PostApi} from "../api/PostApi";

export const createPostAsync = createAsyncThunk("user/createPost",
    (dto: CreatePostDTO) => executePromise(PostApi.createPost(dto)));

export const getPostsAsync = createAsyncThunk("user/getPosts",
    (page: number) => executePromise(PostApi.getPosts(page)));

export const deletePostAsync = createAsyncThunk("user/deletePost",
    (postingIdx: number) => executePromise(PostApi.deletePost(postingIdx)));