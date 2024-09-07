export interface Pricing {
  pricing: {
    mrp1: PricingMRP,
    mrp2: PricingMRP,
    mrp3: PricingMRP
  },
  productCost: number
}

export interface PricingMRP {
  mrp: number,
  primaryPercent: number,
  secondaryPercent: number,
  tertiaryPercent: number
  manufacturerPercent: number
}
