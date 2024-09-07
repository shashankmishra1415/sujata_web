import { Injectable } from '@angular/core';
import { WebAPIService } from '../web-api.service';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/_models/API';
import { BalanceSheet } from '../../_models/balance_sheet.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceSheetService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = `${API.product.APIName}/${API.product.balanceSheet.APIName}`;
  public get(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    //  this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
    //    // successCallback
    //    (data: BalanceSheet) => {
    //      successCallback(data);
    //    }
    //  )

    var data: BalanceSheet = {
      liabilities: {
        capital: [19180, 538, 1153, 1143, 1452],
        reserve: [-14567004, -5113660, -6633137, -7915973, -9250698],
        creditor: [1400000, 100000, 100000, 100000, 100000],
        total: [-13147824, -5013122, -6531983, -7814830, -9149246]
      },
      assets: {
        machinery: [6000, 7000, 7500, 7500, 7500],
        depreciation: [-1500, -2875, -3569, -4158, -4660],
        investments: [0, 0, 6000000, 12000000, 17500000],
        stockInHand: [260330, 260330, 260330, 260330, 260330],
        bankAndCash: [1000000, 1200000, 1500000, 1500000, 1500000],
        total: [1264830, 1464455, 7764262, 13763672, 79263171]
      },
      assets_Liabilities_Difference: [14412654, 6477577, 14296245, 21578502, 28412417],
      netProfit: [-14567004, -5113660, -6633137, -7915973, -9250698],
      cashProfit: [-14567004, -5113660, -6633137, -7915973, -9250698]
    }
    successCallback(data);
  }
}
