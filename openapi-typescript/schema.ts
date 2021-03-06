/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/posts": {
    /** 모든 게시글을 조회한다 */
    get: operations["findAll"];
    /** 게시글을 생성한다 */
    post: operations["create"];
  };
  "/posts/{id}": {
    /** 특정 게시글을 조회한다 */
    get: operations["findOne"];
    /** 특정 게시글을 삭제한다 */
    delete: operations["remove"];
    /** 특정 게시글을 갱신한다 */
    patch: operations["update"];
  };
}

export interface components {
  schemas: {
    CreatePostDto: {
      /** @description 게시글 제목 */
      title: string;
      /** @description 게시글 본문 */
      content: string;
    };
    Post: {
      id: string;
      title: string;
      content: string;
    };
    UpdatePostDto: {
      /** @description 게시글 제목 */
      title?: string;
      /** @description 게시글 본문 */
      content?: string;
    };
  };
}

export interface operations {
  /** 모든 게시글을 조회한다 */
  findAll: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Post"][];
        };
      };
    };
  };
  /** 게시글을 생성한다 */
  create: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreatePostDto"];
      };
    };
  };
  /** 특정 게시글을 조회한다 */
  findOne: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
    };
  };
  /** 특정 게시글을 삭제한다 */
  remove: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
    };
  };
  /** 특정 게시글을 갱신한다 */
  update: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["Post"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdatePostDto"];
      };
    };
  };
}

export interface external {}
