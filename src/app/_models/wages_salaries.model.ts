export interface WagesSalaries {
  id: number,
  stateId: number,
  stateName: string,
  effectiveDate: string,
  wageAndSalaryCategories: wageAndSalaryCategories[]

}
export interface wageAndSalaryCategories {
  id: number,
  employmentCategoryId: number,
  employmentCategoryName: string,
  employmentSubCategoryId: number,
  employmentSubCategoryName: string,
  ratePerMonth: number,
  isDeleted: boolean
}
