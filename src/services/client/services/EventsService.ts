/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventCreate } from '../models/EventCreate';
import type { EventRead } from '../models/EventRead';
import type { EventTypeRead } from '../models/EventTypeRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventsService {

    /**
     * Read Events
     * Retrieve events.
     * @param latitude
     * @param longitude
     * @param distance
     * @param skip
     * @param limit
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static readEvents(
        latitude: number,
        longitude: number,
        distance: number = 25,
        skip?: number,
        limit: number = 100,
    ): CancelablePromise<Array<EventRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/events/',
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
     * Create Event
     * Create new event.
     * @param requestBody
     * @returns EventRead Successful Response
     * @throws ApiError
     */
    public static createEvent(
        requestBody: EventCreate,
    ): CancelablePromise<EventRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/events/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Event Types
     * Retrieve event categories.
     * @returns EventTypeRead Successful Response
     * @throws ApiError
     */
    public static readEventTypes(): CancelablePromise<Array<EventTypeRead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/events/categories/',
        });
    }

}
