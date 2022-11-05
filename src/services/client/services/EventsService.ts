/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventTypeRead } from '../models/EventTypeRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EventsService {

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
