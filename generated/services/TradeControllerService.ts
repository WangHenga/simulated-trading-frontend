/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_Page_TradeVO_ } from "../models/BaseResponse_Page_TradeVO_";
import type { TradeQueryRequest } from "../models/TradeQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class TradeControllerService {
  /**
   * queryTradeList
   * @param tradeQueryRequest tradeQueryRequest
   * @returns BaseResponse_Page_TradeVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static queryTradeListUsingPost(
    tradeQueryRequest: TradeQueryRequest,
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_Page_TradeVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/trade/list/page",
      body: tradeQueryRequest,
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
