import {createAsyncThunk} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CommunitySubmitDTO} from "@/types/post";
import {PostApi} from "../api/PostApi";
import {CommunityCategories} from "@/types/community";

export const createPostAsync = createAsyncThunk("user/createPost",
    (dto: CommunitySubmitDTO) => executePromise(PostApi.createPost(dto)));

export const getPostsAsync = createAsyncThunk("user/getPosts",
    ({page, type}: { page: number, type?: CommunityCategories }) => executePromise(PostApi.getPosts({page, type})));

export const getPostAsync = createAsyncThunk("user/getPost",
    (idx: number) => executePromise(PostApi.getPost(idx)));

export const deletePostAsync = createAsyncThunk("user/deletePost",
    (postingIdx: number) => executePromise(PostApi.deletePost(postingIdx)));

export const updatePostAsync = createAsyncThunk("user/updatePost",
    ({dto, idx}: { dto : CommunitySubmitDTO, idx:number }) => executePromise(PostApi.updatePost({dto, idx})));