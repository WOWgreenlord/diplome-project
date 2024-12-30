export interface Product {
  articul: string;
  shortDesc: string;
  rusDesc: string;
  weightBrutto: number;
  dimensions: {
    length: number;
    height: number;
    width: number;
  };
  propertyGroups: PropertyGroup[];
  vendorWebAddresses: string[];
  pictureLinks: PictureLink[];
}

export interface PropertyGroup {
  id: string;
  name: string;
  level: number;
  sort: number;
  properties: Property[];
}

export interface Property {
  id: string;
  name: string;
  value: string;
  description: string;
  valueType: string;
  level: number;
  sort: number;
}

export interface PictureLink {
  link: string;
  imageSize: string;
  imageType: string;
  isOldImage: boolean;
  main: boolean;
}
