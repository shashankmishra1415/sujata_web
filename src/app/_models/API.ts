export const API = {
  configuration: {
    lookups: {
      employmentCategory: {
        APIName: 'employment-categories'
      },
      employmentSubCategory: {
        APIName: 'employment-sub-categories'
      },
      expenseHead: {
        APIName: 'expense-heads'
      },
      manufacturingProcess: {
        APIName: 'manufacturing-processes'
      },
      wagesAndSalariesProcess: {
        APIName: 'wages-and-salaries'
      }
    },
    componentCategories: {
      APIName: 'common/product-categories'
    },
    componentMaster: {
      APIName: 'components'
    },
    hsnCode: {
      APIName: 'hsn-code'
    },
    creditorDays: {
      APIName: 'creditor-days'
    }
  },
  state: {
    APIName: 'common/state'
  },
  factoryLocations: {
    APIName: 'common/factory-location'
  },
  defaultSettings: {
    APIName: 'common/default-setting'
  },
  product: {
    APIName: 'products',
    clone: {
      APIName: 'clone',
    },
    headcount: {
      APIName: '{id}/head-counts'
    },
    rawMaterial: {
      APIName: '{id}/raw-materials'
    },
    assets: {
      APIName: '{id}/assets'
    },
    depreciation: {
      APIName: '{id}/depreciations'
    },
    salesForecast: {
      APIName: '{id}/sales-forecasts'
    },
    pricing: {
      APIName: '{id}/pricing'
    },
    balanceSheet: {
      APIName: '{id}/balance-sheet'
    },
    financialSummary: {
      APIName: '{id}/financial-summary'
    }
  }
}
