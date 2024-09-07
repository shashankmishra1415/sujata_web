export interface WagesSalariesPopup1 {
    StateID: number,
    EffectiveDate: string,
    EmploymentCategories: {
        CategoryID: number,
        SubcategoryID: number,
        SubcategoryName: string,
        Value: number
    }[]
}
