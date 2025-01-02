export interface Product {
  Availability: string,
  DataSheetUrl: string,
  Description: string,
  FactoryStock: string,
  ImagePath: string,
  Category: string,
  LeadTime: string,
  LifecycleStatus: string,
  Manufacturer: string,
  ManufacturerPartNumber: string,
  Min: string,
  Mult: string,
  MouserPartNumber: string,
  ProductAttributes: ProductAttribute[],
  PriceBreaks: PriceBreak[],
  AlternatePackagings?: null,
  ProductDetailUrl: string,
  Reeling: boolean,
  ROHSStatus: string,
  SuggestedReplacement: string,
  MultiSimBlue: number,
  AvailabilityInStock: string,
  AvailabilityOnOrder: any[],
  InfoMessages: any[],
  SurchargeMessages: null,
  ProductCompliance: ProductCompliance[]
}
export interface ProductCompliance {
  CompilanceName: string,
  CompilanceValue: string
}
export interface ProductAttribute {
  AttributeName: string,
  AttributeValue: string
}
export interface PriceBreak {
  Quantity: number,
  Price: string,
  Currency: string
}