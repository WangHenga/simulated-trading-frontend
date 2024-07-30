/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { TradeVO } from './TradeVO';
export type Page_TradeVO_ = {
    countId?: string;
    current?: number;
    hitCount?: boolean;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<TradeVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

