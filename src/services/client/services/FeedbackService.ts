/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FeedbackCreate } from '../models/FeedbackCreate';
import type { FeedbackRead } from '../models/FeedbackRead';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FeedbackService {

    /**
     * Submit Feedback
     * Submit feedback/bug report.
     * @param requestBody
     * @returns FeedbackRead Successful Response
     * @throws ApiError
     */
    public static submitFeedback(
        requestBody: FeedbackCreate,
    ): CancelablePromise<FeedbackRead> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/feedback/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
