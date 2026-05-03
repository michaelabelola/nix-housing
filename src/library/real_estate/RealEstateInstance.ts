import {type PagedRequest} from "#/library/model/PagedModel.ts";
import {NixFetch} from "#/library/util/fetch.ts";
import type {PropertyListingProfileModel} from "#/library/real_estate/PropertyListingProfileModel.ts";

type RealEstateInstanceConfig = {
    nixFetch: NixFetch
}

export class RealEstateInstance {
    private nixFetch: NixFetch;

    // @ts-ignore
    constructor(private config: RealEstateInstanceConfig) {
        this.config = config;
        this.nixFetch = config.nixFetch;
    }

    queryPropertyListing = (query?: PagedRequest<PropertyListingProfileModel.Query>) => {
        return this.nixFetch.fetch<PropertyListingProfileModel.PropertyListingProfile>(`/real-estate/listings/query`, {
            query: query,
        })
    }

}