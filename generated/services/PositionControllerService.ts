/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_PositionVO_ } from "../models/BaseResponse_Page_PositionVO_";
import type { BaseResponse_Positions_ } from "../models/BaseResponse_Positions_";
import type { PositionQueryRequest } from "../models/PositionQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class PositionControllerService {
  /**
   * getPositions
   * @param id id
   * @returns BaseResponse_Positions_ OK
   * @throws ApiError
   */
  public static getPositionsUsingGet(
    id: number
  ): CancelablePromise<BaseResponse_Positions_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/position/get",
      query: {
        id: id,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * queryPositionList
   * @param positionQueryRequest positionQueryRequest
   * @returns BaseResponse_Page_PositionVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static queryPositionListUsingPost(
    positionQueryRequest: PositionQueryRequest,
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_Page_PositionVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/position/list/page",
      body: positionQueryRequest,
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
