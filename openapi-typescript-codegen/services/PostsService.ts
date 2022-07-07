/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePostDto } from '../models/CreatePostDto';
import type { Post } from '../models/Post';
import type { UpdatePostDto } from '../models/UpdatePostDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PostsService {

    /**
     * 게시글 생성
     * 게시글을 생성한다
     * @returns Post
     * @throws ApiError
     */
    public static create({
        requestBody,
    }: {
        requestBody: CreatePostDto,
    }): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/posts',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 모든 게시글 조회
     * 모든 게시글을 조회한다
     * @returns Post
     * @throws ApiError
     */
    public static findAll(): CancelablePromise<Array<Post>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts',
        });
    }

    /**
     * 특정 게시글 조회
     * 특정 게시글을 조회한다
     * @returns Post
     * @throws ApiError
     */
    public static findOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * 특정 게시글 갱신
     * 특정 게시글을 갱신한다
     * @returns Post
     * @throws ApiError
     */
    public static update({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdatePostDto,
    }): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * 게시글 삭제
     * 특정 게시글을 삭제한다
     * @returns Post
     * @throws ApiError
     */
    public static remove({
        id,
    }: {
        id: string,
    }): CancelablePromise<Post> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/posts/{id}',
            path: {
                'id': id,
            },
        });
    }

}
