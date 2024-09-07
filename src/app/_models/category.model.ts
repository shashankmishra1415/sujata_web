import { Headcount } from "./headcount.model";

export interface Category {
	Year: number;
	CategoryID: number;
	CategoryName: string;
	SubCategories: Headcount[];
  }