/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { OrderVO } from './OrderVO';
export type Page_OrderVO_ = {
    countId?: string;
    current?: number;
    hitCount?: boolean;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<OrderVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

