/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { YardSaleCreate } from '../models/YardSaleCreate';
import type { YardSaleRead } from '../models/YardSaleRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class YardsalesService {

    /**
     * Read Yardsales
     * Retrieve yard sales.
     * @param latitude
     * @param longitude
     * @param distance
     * @param skip
     * @param limit
     * @returns YardSaleRead Successful Response
     * @throws ApiError
     */
    public static readYardsales(
        latitude: number,
        longitude: number,
        distance: number = 25,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<YardSaleRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/yardsales/',
            query: {
                'distance': distance,
                'skip': skip,
                'limit': limit,
                'latitude': latitude,
                'longitude': longitude,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Yardsale
     * Create new yard sale.
     * @param requestBody
     * @returns YardSaleRead Successful Response
     * @throws ApiError
     */
    public static createYardsale(
        requestBody: YardSaleCreate,
    ): CancelablePromise<YardSaleRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/yardsales/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Yardsale Open
     * Create new yard sale.
     * @param requestBody
     * @returns YardSaleRead Successful Response
     * @throws ApiError
     */
    public static createYardsaleOpen(
        requestBody: YardSaleCreate,
    ): CancelablePromise<YardSaleRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/yardsales/open',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
