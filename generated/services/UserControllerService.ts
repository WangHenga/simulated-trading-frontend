/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_LoginUserVO_ } from "../models/BaseResponse_LoginUserVO_";
import type { BaseResponse_RegisterUserVO_ } from "../models/BaseResponse_RegisterUserVO_";
import type { BaseResponse_UserAccountVO_ } from "../models/BaseResponse_UserAccountVO_";
import type { UserLoginRequest } from "../models/UserLoginRequest";
import type { UserRegisterRequest } from "../models/UserRegisterRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UserControllerService {
  /**
   * getAccount
   * @param account account
   * @returns BaseResponse_UserAccountVO_ OK
   * @throws ApiError
   */
  public static getAccountUsingGet(
    account: string
  ): CancelablePromise<BaseResponse_UserAccountVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/getAccount",
      query: {
        account: account,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getUserInfo
   * @returns BaseResponse_UserAccountVO_ OK
   * @throws ApiError
   */
  public static getUserInfoUsingGet(
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_UserAccountVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/user/getUserInfo",
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * login
   * @param request request
   * @returns BaseResponse_LoginUserVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static loginUsingPost(
    request: UserLoginRequest
  ): CancelablePromise<BaseResponse_LoginUserVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/login",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * logout
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static logoutUsingPost(
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/logout",
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * register
   * @param request request
   * @returns BaseResponse_RegisterUserVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static registerUsingPost(
    request: UserRegisterRequest
  ): CancelablePromise<BaseResponse_RegisterUserVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/user/register",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
