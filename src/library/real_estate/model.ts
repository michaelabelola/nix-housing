import type {Money} from "#/library/model/Money.model.ts";
import type {NixFile} from "#/library/model/NixFile.ts";
import type {PagedRequest} from "#/library/model/PagedModel.ts";

export namespace PropertyModel {
    export type ListingProfileID = string
    export type PriceID = string | number
    export type TagID = string
    export type FileID = string
    export type PropertyID = string
    export type PropertyLocationID = string
    export type PropertyFeatureID = string
    export type RentDefinitionID = string
    export type LeaseDefinitionID = string

    export type Location = {
        id: PropertyLocationID | null
        apartment: string | null
        unit: string | null
        building: string | null
        floor: number | null
        line1: string | null
        line2: string | null
        city: string | null
        state: string | null
        postalCode: string | null
        country: string | null
        loc_lat: number | null
        loc_long: number | null
        distance: number | null
    }

    export type Tag = {
        id: TagID
        name: string | null
        colorHex: string | null
    }

    export type Price = {
        id: PriceID
        amount: Money | null
    }
    export enum FieldFormat {
        TEXT = "TEXT",
        LONG_TEXT = "LONG_TEXT",
        NUMBER = "NUMBER",
        TIME = "TIME",
        BOOLEAN = "BOOLEAN",
        MONEY = "MONEY",
    }

    export type Feature = {
        id: PropertyFeatureID
        name: string | null
        description: string | null
        format: FieldFormat | null
        booleanValue: boolean | null
        decimalValue: number | null
        stringValue: string | null
        textValue: string | null
        timeValue: string | null
        unit: string | null
    }

    export enum RentDurationUnit {
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR",
    }
    export type LeaseDurationUnit =  RentDurationUnit

    export type Rent = {
        id: RentDefinitionID
        description: string | null
        amount: Money | null
        duration: number | null
        durationUnit: RentDurationUnit | null
    }

    export type Lease = {
        id: LeaseDefinitionID
        description: string | null
        amount: Money | null
        duration: number | null
        durationUnit: LeaseDurationUnit | null
    }

    export type GalleryItem = {
        id: FileID
        name: string | null
        description: string | null
        file: NixFile.File
        thumbnail: NixFile.Image
        isCoverImage: boolean | null
    }
    export enum PropertyType {
        HOUSE = "HOUSE",
        APARTMENT = "APARTMENT",
        STUDIO = "STUDIO",
        DUPLEX = "DUPLEX",
        PENTHOUSE = "PENTHOUSE",
        VILLA = "VILLA",
        TOWNHOUSE = "TOWNHOUSE",
        LAND = "LAND",
        OTHER = "OTHER",
    }

    export type PropertyListingProfile = {
        id: ListingProfileID
        propertyID: PropertyID
        name: string | null
        description: string | null
        avatar: NixFile.Image
        gallery: GalleryItem[]
        location: Location | null
        type: PropertyType | null
        tags: Tag[]
        price: Price | null
        features: Feature[]
        rent: Rent | null
        lease: Lease | null
        isDefault: boolean | null
    }


    export type Query = PagedRequest<{
        id?: ListingProfileID
        propertyID?: PropertyID
        name?: string
        isDefault?: boolean
        type?: PropertyType
    }>
}
