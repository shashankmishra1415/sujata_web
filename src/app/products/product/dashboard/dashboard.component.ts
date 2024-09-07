import { Component, OnInit, ElementRef, ViewChild,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DownloadService } from 'src/app/_services/products/download.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions
} from "ng-apexcharts";
import { DepreciationService } from 'src/app/_services/products/depreciation.service';
import { Depreciation } from 'src/app/_models/depreciation.model';
import { ActivatedRoute, Params } from '@angular/router';
import { AssetsService } from 'src/app/_services/products/assets.service';
import { AssetType } from 'src/app/_models/asset_type.model';
import { Asset } from 'src/app/_models/assets.model';
import { RawMaterialModel } from '../../../_models/RawMaterial.model';
import { ComponentModal } from '../../../_models/Component.model';
import { RawMaterialService } from '../../../_services/products/raw-material.service';
import { ComponentMasterService } from '../../../_services/configuration/component-master.service';
import { SalesForecastService } from '../../../_services/products/sales-forecast.service';
import { SaleForecast } from '../../../_models/SaleForecast.model';
import { Product } from '../../../_models/product.model';
import { ProductService } from '../../../_services/products/products.service';
import { HeadcountService } from '../../../_services/products/headcount.service';
import { Headcount } from '../../../_models/headcount.model';
import { register } from 'swiper/element/bundle';
import { Pricing, PricingMRP } from '../../../_models/pricing.model';
import { PricingService } from '../../../_services/products/pricing.service';
import { BalanceSheetService } from '../../../_services/products/balance-sheet.service';
import { BalanceSheet } from '../../../_models/balance_sheet.model';
import { FinancialSummaryService } from '../../../_services/products/financial-summary.service';
import { FinancialSummary } from '../../../_models/financial_summary.model';
register();
export type ChartOptions = {
  series: ApexAxisChartSeries;
  series1: ApexNonAxisChartSeries;
  chart: ApexChart;
  chart1: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  ProductID: number = 0;

  years = Array(5).fill(0).map((x, i) => i + 1);


  @ViewChild('dashboardContainer') dashboardContainer!: ElementRef;
  downloadReport() {
    const fileName = 'dashboard_report.pdf';
    const fileType = 'application/pdf';
    this.downloadService.downloadData(this.dashboardContainer.nativeElement, fileName, fileType);
  }

  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild("chart1") chart1!: ChartComponent;
  constructor(private downloadService: DownloadService,
    private depreciationService: DepreciationService, private route: ActivatedRoute,
    private assetService: AssetsService,

    private rawMaterialService: RawMaterialService,
    private componentService: ComponentMasterService,
    private salesForecastService: SalesForecastService,
    private productService: ProductService,
    private headCountService: HeadcountService,
    private pricingService: PricingService,
    private balanceSheetService: BalanceSheetService,
    private financialSummaryService: FinancialSummaryService
  ) {

  }

  /*Production Capacity Variables: Start */
  product!: Product;

  loadProductData() {
    if (this.ProductID !== 0) {
      this.productService.getById(this.ProductID,
        // successCallback
        (data: Product) => {
          this.product = data;
        }
      );
    }
  }
  get monthlyProductionCapacity(): number {
    if (this.product === undefined) {
      return 0;
    }
    return this.product.workingHourPerDay * this.product.workingDaysPerMonth * this.product.piecesPerHour
  }
  /*Production Capacity Variables: End */

  /*Wages & Salaries Variables: Start */
  headcountData: Headcount[] = [];
  wagesSalaries: {
    year: number
    amount: number
    personCount: number
  }[] = [];
  loadWagesSalaryData() {
    this.headCountService.list(this.ProductID,
      // successCallback
      (data: Headcount[]) => {
        this.headcountData = data;
        this.initializeWagesSalariesData();
      }
    );
  }
  initializeWagesSalariesData() {
    for (var year = 1; year <= 5; year++) {
      let totalAmount = 0;
      let totalCount = 0;

      // Filter data for the specified year
      const filteredData = this.headcountData.filter(item => item.year === year);

      // Calculate the sum of (count * subcategorySalary) for all subcategories within all categories
      filteredData.forEach(item => {
        totalAmount += item.count * item.ratePerMonth;
        totalCount += item.count;
      });

      this.wagesSalaries.push({
        year: year,
        personCount: totalCount,
        amount: totalAmount
      });
    }
  }
  /*Wages & Salaries Variables: End */

  /*Raw Material Variables: Start*/
  RawMaterials: RawMaterialModel[] = [];
  Components: ComponentModal[] = [];

  loadRawmaterials() {
    this.rawMaterialService.list(this.ProductID,
      // successCallback
      (data: RawMaterialModel[]) => {
        this.RawMaterials = data;
        this.initializeChartForRawMaterial();
      }
    )
  }

  loadComponents() {
    this.componentService.list('', '', 0, '',
      // successCallback
      (data: ComponentModal[]) => {
        this.Components = data;
        this.initializeChartForRawMaterial();
      }
    )
  }

  get RawMaterialCost(): number {
    return this.rawMaterialService.totalCost(this.RawMaterials, this.Components);
  }
  get ComponentsCount(): number {
    return this.rawMaterialService.totalComponentCount(this.RawMaterials);
  }
  get InHouseComponentsCount(): number {
    return this.rawMaterialService.totalInHouseComponentCount(this.RawMaterials);
  }
  get OutSourcedComponentsCount(): number {
    return this.rawMaterialService.totalOutsourcedComponentCount(this.RawMaterials);
  }
  get TotalInHouseCost(): number {
    return this.rawMaterialService.totalInHouseCost(this.RawMaterials, this.Components);
  }
  get TotalOutSourcedCost(): number {
    return this.rawMaterialService.totalOutSourcedCost(this.RawMaterials, this.Components);
  }

  public chartOptionsRawMaterial: Partial<ChartOptions> = {
    series1: [1, 1],
    chart1: {
      type: "donut"
    },
    colors: ["#28dac6", "#fdac34"],
    labels: ["Outsourced", "In-house"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart1: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  initializeChartForRawMaterial() {
    this.chartOptionsRawMaterial.series1 = [this.TotalOutSourcedCost, this.TotalInHouseCost];
  }


  /*Raw Material Variables: End*/


  /*Sales Volume Forecast Variables: Start*/
  salesData!: {
    salesForecasts: SaleForecast[],
    pricingInformations: {
      name: string,
      price: number
    }[]
  };

  loadSalesForecastData() {
    this.salesForecastService.list(this.ProductID,
      //successCallback
      (data: {
        salesForecasts: SaleForecast[],
        pricingInformations: {
          name: string,
          price: number
        }[]
      }) => {
        this.salesData = data;
        this.salesForecastService.fixMissingMonths(this.salesData.salesForecasts);
        this.initializeChartForSalesVolumeForecast();
      }
    )
  }

  chartOptionsSalesVolumeForecast: Partial<ChartOptions> = {
    series: [
      {
        name: "Quantity",
        data: [0, 0, 0, 0, 0]
      },
      {
        name: "Increament",
        data: [0, 0, 0, 0, 0]
      }
    ],
    xaxis: {
      categories: [1, 2, 3, 4, 5],
      title: {
        text: "Years"
      }
    },
    yaxis: {
      title: {
        text: "Quantity"
      },
      min: 0,
    },
    chart: {
      height: 275,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ["#ea5455", "#ff9f43"],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    legend: {
      position: "right",
      horizontalAlign: "right",
      floating: false,
      offsetY: 0,
      offsetX: -20
    },
    title: {
      text: "Sales Forecast"
    },
  };
  initializeChartForSalesVolumeForecast() {
    this.chartOptionsSalesVolumeForecast.series = [
      {
        name: "Quantity",
        data: [
          this.salesForecastService.getQuantityByYear(1, this.salesData.salesForecasts),
          this.salesForecastService.getQuantityByYear(2, this.salesData.salesForecasts),
          this.salesForecastService.getQuantityByYear(3, this.salesData.salesForecasts),
          this.salesForecastService.getQuantityByYear(4, this.salesData.salesForecasts),
          this.salesForecastService.getQuantityByYear(5, this.salesData.salesForecasts),
        ]
      },
      {
        name: "Increament",
        data: [
          this.salesForecastService.getYearIncrement(1, this.salesData.salesForecasts),
          this.salesForecastService.getYearIncrement(2, this.salesData.salesForecasts),
          this.salesForecastService.getYearIncrement(3, this.salesData.salesForecasts),
          this.salesForecastService.getYearIncrement(4, this.salesData.salesForecasts),
          this.salesForecastService.getYearIncrement(5, this.salesData.salesForecasts),
        ]
      }
    ];
  }
  /*Sales Volume Forecast Variables: End*/


  /*Investment and Assets Variables: Start */
  assetsData: {
    assetTypes: AssetType[],
    data: Asset[]
  } = {
      assetTypes: [],
      data: []
    };

  loadDataForAssets() {
    this.assetService.list(this.ProductID,
      (data: {
        assetTypes: AssetType[],
        data: Asset[]
      }) => {
        this.assetsData = data;

        this.initializeChartForAssets();
      }
    )
  }

  chartOptionsAssets: Partial<ChartOptions> = {
    series: [],
    xaxis: {
      categories: [1, 2, 3, 4, 5],
      title: {
        text: "Years"
      }
    },
    yaxis: {
      title: {
        text: "Amount"
      },
      min: 0,
    },
    chart: {
      height: 275,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ["#ea5455", "#ff9f43", "#32bab5", "#259ffb"],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    legend: {
      position: "right",
      horizontalAlign: "left",
      floating: false,
      offsetY: 0,
      offsetX: -20
    },
    title: {
      text: undefined
    },
  };

  initializeChartForAssets() {
    this.chartOptionsAssets.series = this.assetsData.assetTypes.map(assetType => {
      return {
        name: assetType.name,
        data: this.assetsData.data
          .filter(item => item.assetTypeId === assetType.id)
          .reduce((result: any, item) => {
            const yearIndex = item.year - 1;
            result[yearIndex] = item.amount;
            return result;
          }, [])
      }
    });

    this.chartOptionsAssets.series?.push({
      name: 'Total',
      data: this.assetsData.data
        .reduce((result: any, item) => {
          const yearIndex = item.year - 1;
          result[yearIndex] = (result[yearIndex] || 0) + item.amount;
          return result;
        }, [])
    })
  }

  /*Investment and Assets Variables: End */

  /*Depreciation Variables: Start */
  dataDepreciation: Depreciation[] = [];
  loadDataForDepreciation() {
    this.depreciationService.list(this.ProductID, (data: Depreciation[]) => {
      this.dataDepreciation = data;
      this.initializeChartForDepreciation();
    })
  }
  chartOptionsDepreciation: Partial<ChartOptions> = {
    series: [],
    xaxis: {
      categories: [1, 2, 3, 4, 5],
      title: {
        text: "Years"
      }
    },
    yaxis: {
      title: {
        text: "Amount"
      },
      min: 0,
    },
    chart: {
      height: 275,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ["#ea5455", "#ff9f43"],
    dataLabels: {
      enabled: true
    },
    stroke: {
      curve: "smooth"
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    legend: {
      position: "right",
      horizontalAlign: "right",
      floating: false,
      offsetY: 0,
      offsetX: -20
    },
    title: {
      text: undefined
    },
  };
  initializeChartForDepreciation() {
    this.chartOptionsDepreciation.series = [
      {
        name: "Depreciation",
        data: this.dataDepreciation.map(item => (item.amount * item.percent / 100))
      },
      {
        name: "Written down values",
        data: this.dataDepreciation.map(item => item.amount - (item.amount * item.percent / 100))
      }
    ];
  }

  /*Depreciation Variables: End */

  /*MRP Variables: Start */
  MRPData!: Pricing;
  selectedMRP!: PricingMRP;

  pricingRetailerLandingPrice: number = 0;
  pricingRetailerMargin:number = 0;

  pricingDealerLandingPrice: number = 0;
  pricingDealerMargin:number = 0;

  pricingDistributorLandingPrice: number = 0;
  pricingDistributorMargin: number = 0;

  pricingManufacturerLandingPrice: number = 0;
  pricingManufacturerMargin:number = 0;

  loadMRPData()
  {
    this.pricingService.get(this.ProductID,
      // successCallback
      (data: Pricing) => {
        this.MRPData = data;
        this.selectedMRP = this.MRPData.pricing.mrp1 ?? this.MRPData.pricing.mrp2 ?? this.MRPData.pricing.mrp3 ?? null;

        if (this.selectedMRP !== null) {
          this.pricingRetailerLandingPrice = (this.selectedMRP.mrp / (this.MRPData.pricing.mrp1.tertiaryPercent + 100)) * 100;
          this.pricingRetailerMargin = this.selectedMRP.mrp - this.pricingRetailerLandingPrice;

          this.pricingDealerLandingPrice = (this.pricingRetailerLandingPrice / (this.selectedMRP.secondaryPercent + 100)) * 100;
          this.pricingDealerMargin = this.pricingRetailerLandingPrice - this.pricingDealerLandingPrice;

          this.pricingDistributorLandingPrice = (this.pricingDealerLandingPrice / (this.selectedMRP.primaryPercent + 100)) * 100;
          this.pricingDistributorMargin = this.pricingDealerLandingPrice - this.pricingDistributorLandingPrice;

          this.pricingManufacturerMargin = this.pricingDistributorLandingPrice - this.MRPData.productCost;

          if (!Number.isInteger(this.pricingRetailerLandingPrice)) {
            this.pricingRetailerLandingPrice = +this.pricingRetailerLandingPrice.toFixed(2);
          }
          if (!Number.isInteger(this.pricingRetailerMargin)) {
            this.pricingRetailerMargin = +this.pricingRetailerMargin.toFixed(2);
          }

          if (!Number.isInteger(this.pricingDealerLandingPrice)) {
            this.pricingDealerLandingPrice = +this.pricingDealerLandingPrice.toFixed(2);
          }
          if (!Number.isInteger(this.pricingDealerMargin)) {
            this.pricingDealerMargin = +this.pricingDealerMargin.toFixed(2);
          }

          if (!Number.isInteger(this.pricingDistributorLandingPrice)) {
            this.pricingDistributorLandingPrice = +this.pricingDistributorLandingPrice.toFixed(2);
          }
          if (!Number.isInteger(this.pricingDistributorMargin)) {
            this.pricingDistributorMargin = +this.pricingDistributorMargin.toFixed(2);
          }

          if (!Number.isInteger(this.pricingManufacturerMargin)) {
            this.pricingManufacturerMargin = +this.pricingManufacturerMargin.toFixed(2);
          }
        }
      }
    );
  }
  /*MRP Variables: End */

  /*Balance Sheet Variables: Start */
  balanceSheetData!: BalanceSheet;
  public chartOptionsBalanceSheet!: Partial<ChartOptions>;

  loadBalanceSheetData() {
    this.balanceSheetService.get(this.ProductID,
      // successCallback
      (data: BalanceSheet) => {
        this.balanceSheetData = data;
        this.initializeChartForBalanceSheet();
      }
    );
  }

  initializeChartForBalanceSheet() {
    this.chartOptionsBalanceSheet = {
      series: [
        {
          name: "basic",
          data: this.balanceSheetData.netProfit
        }
      ],
      chart: {
        type: "bar",
        height: 250,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '35%',
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"]
      }
    };

  }

  /*Balance Sheet Variables: End */

  /*Financial Summary Variables: Start */
  financialSummaryData!: FinancialSummary;
  loadFinancialSummary() {
    this.financialSummaryService.get(this.ProductID,
      // successCallback
      (data: FinancialSummary) => {
        this.financialSummaryData = data;
      }
    )
  }

  getYPGrossProfitByYear(year: number): number {
    let value = 0;
    this.financialSummaryData.grossProfit.forEach((gpValue, gpIndex) => {
      if ((gpIndex + 1) >= ((year - 1) * 12) + 1 && (gpIndex + 1) <= (year * 12)) {
        value += gpValue;
      }
    })

    return value;
  }

  getYPNetProfitByYear(year: number): number {
    let value = 0;
    this.financialSummaryData.netProfit.forEach((npValue, npIndex) => {
      if ((npIndex + 1) >= ((year - 1) * 12) + 1 && (npIndex + 1) <= (year * 12)) {
        value += npValue;
      }
    })

    return value;
  }

  getYPGrossProfitPercent(year: number): number {
    let value = 0
    if (year !== 1) {
      let currentYearGP = this.getYPGrossProfitByYear(year);
      let previousYearGP = this.getYPGrossProfitByYear(year - 1);
      let diff = currentYearGP - previousYearGP;
      value = diff * 100 / previousYearGP;

      if (Number.isNaN(value)) {
        value = 0;
      }
      else if (!Number.isInteger(value)) {
        value = +value.toFixed(2);
      }
    }

    return value;
  }

  getYPNetProfitPercent(year: number): number {
    let value = 0
    if (year !== 1) {
      let currentYearNP = this.getYPNetProfitByYear(year);
      let previousYearNP = this.getYPNetProfitByYear(year - 1);
      let diff = currentYearNP - previousYearNP;
      value = diff * 100 / previousYearNP;

      if (Number.isNaN(value)) {
        value = 0;
      }
      else if (!Number.isInteger(value)) {
        value = +value.toFixed(2);
      }
    }

    return value;
  }

  /*Financial Summary Variables: End */

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {

        if (params["id"]) {
          this.ProductID = params["id"];
        }
      }
    );

    /* Production Capacity Code: Start */
    this.loadProductData();
    /* Production Capacity Code: End */

    /* Raw Material Code: Start*/
    this.loadRawmaterials();
    this.loadComponents();
    /* Raw Material Code: End*/

    /* Wages & Salaries Code: Start */
    this.loadWagesSalaryData();
    /* Wages & Salaries Code: End */

    /* Sales Volume Forecast Code: Start */
    this.loadSalesForecastData();
    /* Sales Volume Forecast Code: End */

    /* Investments and Asstes Code: Start */
    this.loadDataForAssets();
    /* Investments and Asstes Code: End */

    /* Depreciation Code: Start */
    this.loadDataForDepreciation();
    /* Depreciation Code: End */

    /* MRP Code: Start */
    this.loadMRPData();
    /* MRP Code: End */

    /* Balance Sheet Code: Start */
    this.loadBalanceSheetData();
    /* Balance Sheet Code: End */

    /* Financial Summary Code: Start */
    this.loadFinancialSummary();
    /* Financial Summary Code: End */

    if (this.route.parent) {
      this.route.parent.params.subscribe(
        (params: Params) => {
          if (params["id"]) {
            this.ProductID = params["id"];
          }
        }
      );
    }
  }
}
