import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CommunitySubmitDTO} from "@/types/post";
import {PostApi} from "../api/PostApi";

export const createPostAsync = createAsyncThunk("user/createPost",
    (dto: CommunitySubmitDTO) => executePromise(PostApi.createPost(dto)));

export const getPostsAsync = createAsyncThunk("user/getPosts",
    (page: number) => executePromise(PostApi.getPosts(page)));

export const getPostAsync = createAsyncThunk("user/getPost",
    (idx: number) => executePromise(PostApi.getPost(idx)));

export const deletePostAsync = createAsyncThunk("user/deletePost",
    (postingIdx: number) => executePromise(PostApi.deletePost(postingIdx)));

export const updatePostAsync = createAsyncThunk("user/updatePost",
    ({dto, idx}: { dto : CommunitySubmitDTO, idx:number }) => executePromise(PostApi.updatePost({dto, idx})));