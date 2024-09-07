import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { WebAPIService } from '../web-api.service';
import { HttpClient } from '@angular/common/http';
import { SalesForecastType } from 'src/app/_models/SalesForecastType.model';
import { SaleForecast } from 'src/app/_models/SaleForecast.model';

@Injectable({
  providedIn: 'root'
})

export class SalesForecastService {
  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = `${API.product.APIName}/${API.product.salesForecast.APIName}`;

  public list(ProductID: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName.replace('{id}', ProductID.toString()), null,
      // successCallback
      (data: {
        salesForecasts: SaleForecast[],
        pricingInformations: {
          name: string,
          price: number
        }[]
      }) => {
        successCallback(data);
      }
    )
  }

  public save(productId: number, saleForecastData: SaleForecast[], successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), saleForecastData,
      // successCallback
      () => {
        successCallback();
      },
      // errorCallback
      (error: any) => {
        if (typeof (errorCallback) === 'function') {
          errorCallback(error)
        }
      }
    )
  }





  public fixMissingMonths(salesForecasts: SaleForecast[]) {
    for (var month = 1; month <= 60; month++) {
      let monthData = salesForecasts.filter(x => x.month === month);
      if (monthData === null || monthData === undefined || monthData.length === 0) {
        salesForecasts.push({
          month: month,
          quantity: 0
        });
      }
    }
  }

  getQuantityByYear(year: number, salesForecasts: SaleForecast[]): number {
    let qty = 0;
    salesForecasts.filter(x => x.month >= ((year - 1) * 12) + 1 && x.month <= (year * 12)).forEach(foreCast => {
      qty += foreCast.quantity;
    });

    return qty;
  }

  getYearIncrement(year: number, salesForecasts: SaleForecast[]): number {
    if (year === 1) {
      return 0;
    }
    else {
      let prevYearVal = this.getQuantityByYear(year - 1, salesForecasts);
      let currYearVal = this.getQuantityByYear(year, salesForecasts);
      return currYearVal - prevYearVal;
    }
  }

  getYearIncrementPercent(year: number, salesForecasts: SaleForecast[]): number {
    if (year === 1) {
      return 0;
    }
    else {
      let prevYearVal = this.getQuantityByYear(year - 1, salesForecasts);
      let currYearVal = this.getQuantityByYear(year, salesForecasts);

      let percentVal = ((currYearVal - prevYearVal) * 100) / prevYearVal;
      if (Number.isNaN(percentVal)) {
        return 0;
      }
      else if (Number.isInteger(percentVal)) {
        return percentVal;
      }
      else {
        return +percentVal.toFixed(2);
      }
    }
  }
}
