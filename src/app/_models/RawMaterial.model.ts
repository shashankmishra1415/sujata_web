export interface RawMaterialModel {
  id: number;
  componentId: number;
  componentName: string;
  categoryId: number;
  categoryName: string
  //cost: number;
  isOutSourced: boolean;
  quantity: number;
}

export interface RawMaterialSaveModel {
  componentId: number,
  isOutSourced: boolean,
  quantity: number
}
