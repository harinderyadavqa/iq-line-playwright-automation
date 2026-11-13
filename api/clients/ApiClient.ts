
import type {
    APIRequestContext,
    APIResponse,
} from '@playwright/test';

export class ApiClient {
    constructor(
        private readonly request: APIRequestContext
    ) {}

    async get(
        endpoint: string,
        params: URLSearchParams
    ): Promise<APIResponse> {
        return this.request.get(endpoint, { params });
    }
}
