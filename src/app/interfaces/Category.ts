export interface Category {
  id: string;
  name: string;
  parentId: string;
  sortIndex: number;
  children?: Category[];
  isExpanded?: boolean;
  isSelected?: boolean;
  // ?
}


