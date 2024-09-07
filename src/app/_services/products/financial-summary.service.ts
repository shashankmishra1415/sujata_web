import { Injectable } from '@angular/core';
import { WebAPIService } from '../web-api.service';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/_models/API';
import { FinancialSummary } from '../../_models/financial_summary.model';

@Injectable({
  providedIn: 'root'
})
export class FinancialSummaryService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = `${API.product.APIName}/${API.product.financialSummary.APIName}`;
  public get(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    //  this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
    //    // successCallback
    //    (data: BalanceSheet) => {
    //      successCallback(data);
    //    }
    //  )

    var data: FinancialSummary = {
      revenueFromOperations: [19180, 538, 1153, 1143, 1452],
      tvc: [-14567004, -5113660, -6633137, -7915973, -9250698],
      grossProfit: [1400000, 100000, 100000, 100000, 100000],
      grossProfitRatio: [-13147824, -5013122, -6531983, -7814830, -9149246],
      otherIncome: [6000, 7000, 7500, 7500, 7500],
      fixedCost: [-1500, -2875, -3569, -4158, -4660],
      contingencyFactor: [0, 0, 6000000, 12000000, 17500000],
      netProfit: [260330, 260330, 260330, 260330, 260330],
      netProfitRatio: [1000000, 1200000, 1500000, 1500000, 1500000]
    }
    successCallback(data);
  }
}
