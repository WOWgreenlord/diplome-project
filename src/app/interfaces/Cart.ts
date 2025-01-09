export interface Cart {
  MouserPartNumber: string;
  Quantity: number;
  CustomerPartNumber?: string; // Необязательное поле
  PackagingChoice: 'None' | 'Cut_Tape' | 'MouseReel' | 'FullReel';
}