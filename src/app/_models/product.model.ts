export interface Product {
  id: number;
  name: string;
  factoryLocationId: number;
  createdDate: Date;
  piecesPerHour: number;
  workingHourPerDay: number;
  workingDaysPerMonth: number;
  productMedia: {
    id: number,
    fileId: number,
    isDeleted: boolean
  }[];
}
