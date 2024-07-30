/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Instrument } from './Instrument';
import type { OrderItem } from './OrderItem';
export type Page_Instrument_ = {
    countId?: string;
    current?: number;
    hitCount?: boolean;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Instrument>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

