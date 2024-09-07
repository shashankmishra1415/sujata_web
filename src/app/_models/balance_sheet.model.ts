export interface BalanceSheet {
  liabilities: {
    capital: number[],
    reserve: number[],
    creditor: number[]
    total: number[]
  },
  assets: {
    machinery: number[],
    depreciation: number[],
    investments: number[],
    stockInHand: number[],
    bankAndCash: number[],
    total: number[]
  },
  assets_Liabilities_Difference: number[],
  netProfit: number[],
  cashProfit: number[]
}
