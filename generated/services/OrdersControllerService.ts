/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_int_ } from "../models/BaseResponse_int_";
import type { BaseResponse_Page_OrderVO_ } from "../models/BaseResponse_Page_OrderVO_";
import type { OrderCreateRequest } from "../models/OrderCreateRequest";
import type { OrderQueryRequest } from "../models/OrderQueryRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class OrdersControllerService {
  /**
   * cancelOrder
   * @param orderId orderId
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static cancelOrderUsingPost(
    orderId?: number,
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/cancel",
      query: {
        orderId: orderId,
      },
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * createOrder
   * @param request request
   * @returns BaseResponse_int_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static createOrderUsingPost(
    request: OrderCreateRequest,
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_int_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/create",
      body: request,
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * queryOrderList
   * @param orderQueryRequest orderQueryRequest
   * @returns BaseResponse_Page_OrderVO_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static queryOrderListUsingPost(
    orderQueryRequest: OrderQueryRequest,
    headers?: Record<string, string>
  ): CancelablePromise<BaseResponse_Page_OrderVO_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/order/list/page",
      body: orderQueryRequest,
      headers: headers,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
