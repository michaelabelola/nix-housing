import {QueryStringUtil} from "#/library/util/QueryStringUtil.ts";

type FetchInitParams = Parameters<typeof fetch>[1] & {
    query?: Parameters<typeof QueryStringUtil.paramsToQueryString>[0] | Record<string, any>
    contentType?: string | "omit"
}

type FetchInput = Parameters<typeof fetch>[0]

type NixFetchConfig = {
    apiKey: string;
    appID: string;
    entityID: string;
    baseURL: string;
}

export type ErrorFieldType = Record<string, string>

type ResponseProperties = {
    fields: ErrorFieldType[]
    message?: string
}

export type ResponseError = Partial<{
    title: string
    detail: string
    message: string
    instance: string //URI
    type?: string //URI
    status: number //HTTP status code
    properties: ResponseProperties
}> & Error

export type FetchError = {
    _internal: Partial<Pick<Response, "status" | "redirected" | "statusText" | "headers">> & {
        body?: string
    }
} & ResponseError

interface RequestPromise<T, E = FetchError> extends Promise<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;

    catch<TResult = never>(onrejected?: ((reason: E) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
}

export class NixFetch {
    private config: NixFetchConfig

    constructor(config: NixFetchConfig) {
        this.config = config;
        this.initialize()
    }

    private initialize() {
        if (!this.config.apiKey) console.error("API key is required for NixFetch")
        if (!this.config.appID) console.error("App ID is required for NixFetch")
        if (!this.config.entityID) console.error("Entity ID is required for NixFetch")
        if (!this.config.baseURL) console.error("Base URL is required for NixFetch")
    }

    fetch = <T, E = FetchError>(input: FetchInput, initMain?: FetchInitParams) => {
        const {contentType, query, ...init} = initMain ?? {};
        const headers = new Headers(init?.headers);
        const queryString = QueryStringUtil.paramsToQueryString(query || {});

        if (contentType !== "omit") headers.set("Content-Type", contentType || "application/json")

        headers.set('X-API-KEY', this.config.apiKey)
        headers.set('X-APP-ID', this.config.appID)
        headers.set('X-ENTITY-ID', this.config.entityID)

        if (!(input instanceof URL))
            input = new URL(input.toString() + queryString, this.config.baseURL)

        return fetch(input, {
            ...init,
            headers,
        }) as RequestPromise<T, FetchError | E> | Promise<T>
    }

    // fetchRaw = (input: FetchInput, init?: FetchInitParams) => {
    //     return fetch(input, init)
    // }
}
