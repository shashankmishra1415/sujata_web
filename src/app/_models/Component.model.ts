export interface ComponentModal {
  id: number;
  code: string;
  name: string;
  categoryId: number;
  rawMaterial: string;
  unitPrice: number;
  subComponentCount: number;
  componentManufacturingCostTotal: number;
  componentManufacturingCosts: { manufacturingProcessId: number; cost: number }[]
}
