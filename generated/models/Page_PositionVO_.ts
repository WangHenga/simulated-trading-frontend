/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
import type { PositionVO } from './PositionVO';
export type Page_PositionVO_ = {
    countId?: string;
    current?: number;
    hitCount?: boolean;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<PositionVO>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

