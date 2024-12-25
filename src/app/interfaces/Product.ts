// import { Links } from "./Links";
import { Vendor } from "./Vendor";

export interface Product {
    Id: number,
    Code: string,
    Articul: string,
    Name: string,
    RusName: string,
    Description: string,
    WarrantyPeriod: string,
    Width: number,
    Length: number,
    Height: number,
    Brutto: number,
    AttributeGroups: AttributeGroup[],
    LinkedProducts: null,
    GTIN: string,
    Price: null,
    Availability: null,
    DeliveriesInfo: null,
    MinimalPriceInfo: null,
    Vendor: Vendor,
    ImageLink: null,
}

export interface AttributeGroup {
    Id: number,
    Name: string,
    Attributes: Attribute[],
    SortIndex: number,
    ViewType: number,
}
export interface Attribute {
    Id: number,
    Name: string,
    Description: string,
    Value: string,
    SortIndex: number,
    Comment: null,
}
  