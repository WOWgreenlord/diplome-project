export interface Cart {
  CartItems: Item[];
  CartKey: string;
  CurrencyCode: string;
  MerchandiseTotal: number;
  TotalItemCount: number;
}

export interface Item {
  MouserPartNumber: string;
  Quantity: number;
  CustomerPartNumber?: string;
  PackagingChoice?: string;
}