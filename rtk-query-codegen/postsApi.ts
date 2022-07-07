import { emptySplitApi as api } from "../src/store/emptyApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    create: build.mutation<CreateApiResponse, CreateApiArg>({
      query: (queryArg) => ({
        url: `/posts`,
        method: "POST",
        body: queryArg.createPostDto,
      }),
    }),
    findAll: build.query<FindAllApiResponse, FindAllApiArg>({
      query: () => ({ url: `/posts` }),
    }),
    findOne: build.query<FindOneApiResponse, FindOneApiArg>({
      query: (queryArg) => ({ url: `/posts/${queryArg.id}` }),
    }),
    update: build.mutation<UpdateApiResponse, UpdateApiArg>({
      query: (queryArg) => ({
        url: `/posts/${queryArg.id}`,
        method: "PATCH",
        body: queryArg.updatePostDto,
      }),
    }),
    remove: build.mutation<RemoveApiResponse, RemoveApiArg>({
      query: (queryArg) => ({ url: `/posts/${queryArg.id}`, method: "DELETE" }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as postsApi };
export type CreateApiResponse = /** status 201  */ Post;
export type CreateApiArg = {
  createPostDto: CreatePostDto;
};
export type FindAllApiResponse = /** status 200  */ Post[];
export type FindAllApiArg = void;
export type FindOneApiResponse = /** status 200  */ Post;
export type FindOneApiArg = {
  id: string;
};
export type UpdateApiResponse = /** status 200  */ Post;
export type UpdateApiArg = {
  id: string;
  updatePostDto: UpdatePostDto;
};
export type RemoveApiResponse = /** status 200  */ Post;
export type RemoveApiArg = {
  id: string;
};
export type Post = {
  id: string;
  title: string;
  content: string;
};
export type CreatePostDto = {
  title: string;
  content: string;
};
export type UpdatePostDto = {
  title?: string;
  content?: string;
};
export const {
  useCreateMutation,
  useFindAllQuery,
  useFindOneQuery,
  useUpdateMutation,
  useRemoveMutation,
} = injectedRtkApi;
