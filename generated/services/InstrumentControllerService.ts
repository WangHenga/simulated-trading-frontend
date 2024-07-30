/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse_boolean_ } from "../models/BaseResponse_boolean_";
import type { BaseResponse_Instrument_ } from "../models/BaseResponse_Instrument_";
import type { BaseResponse_InstrumentVO_ } from "../models/BaseResponse_InstrumentVO_";
import type { BaseResponse_int_ } from "../models/BaseResponse_int_";
import type { BaseResponse_Page_Instrument_ } from "../models/BaseResponse_Page_Instrument_";
import type { InstrumentAddRequest } from "../models/InstrumentAddRequest";
import type { InstrumentQueryRequest } from "../models/InstrumentQueryRequest";
import type { InstrumentUpdateRequest } from "../models/InstrumentUpdateRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class InstrumentControllerService {
  /**
   * addInstrument
   * @param request request
   * @returns BaseResponse_int_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static addInstrumentUsingPost(
    request: InstrumentAddRequest
  ): CancelablePromise<BaseResponse_int_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/instrument/add",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * deleteInstrument
   * @param instrumentId instrumentId
   * @returns BaseResponse_boolean_ OK
   * @throws ApiError
   */
  public static deleteInstrumentUsingGet(
    instrumentId?: number
  ): CancelablePromise<BaseResponse_boolean_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/instrument/delete",
      query: {
        instrumentId: instrumentId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * getInstrumentInfo
   * @param instrumentId instrumentId
   * @returns BaseResponse_InstrumentVO_ OK
   * @throws ApiError
   */
  public static getInstrumentInfoUsingGet(
    instrumentId?: number
  ): CancelablePromise<BaseResponse_InstrumentVO_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/instrument/info",
      query: {
        instrumentId: instrumentId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * queryInstrumentList
   * @param instrumentQueryRequest instrumentQueryRequest
   * @returns BaseResponse_Page_Instrument_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static queryInstrumentListUsingPost(
    instrumentQueryRequest: InstrumentQueryRequest
  ): CancelablePromise<BaseResponse_Page_Instrument_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/instrument/list/page",
      body: instrumentQueryRequest,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * queryInstrument
   * @param instrumentId instrumentId
   * @returns BaseResponse_Instrument_ OK
   * @throws ApiError
   */
  public static queryInstrumentUsingGet(
    instrumentId?: number
  ): CancelablePromise<BaseResponse_Instrument_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/instrument/query",
      query: {
        instrumentId: instrumentId,
      },
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }

  /**
   * updateInstrument
   * @param request request
   * @returns BaseResponse_boolean_ OK
   * @returns any Created
   * @throws ApiError
   */
  public static updateInstrumentUsingPost(
    request: InstrumentUpdateRequest
  ): CancelablePromise<BaseResponse_boolean_ | any> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/instrument/update",
      body: request,
      errors: {
        401: `Unauthorized`,
        403: `Forbidden`,
        404: `Not Found`,
      },
    });
  }
}
