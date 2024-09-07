import { Injectable } from '@angular/core';
import { WebAPIService } from '../web-api.service';
import { Depreciation } from 'src/app/_models/depreciation.model';
import { API } from 'src/app/_models/API';

@Injectable({
  providedIn: 'root'
})
export class DepreciationService {

  constructor(private webApiService: WebAPIService) { }
  APIName = `${API.product.APIName}/${API.product.depreciation.APIName}`;
  public list(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    //var data: Depreciation[] = [
    //  {
    //    assetTypeID: 2,
    //    year: 1,
    //    percent: 25,
    //    amount:13333
    //  },
    //  {
    //    assetTypeID: 2,
    //    year: 2,
    //    percent: 25,
    //    amount:20000
    //  },
    //  {
    //    assetTypeID: 2,
    //    year: 3,
    //    percent: 25,
    //    amount:30000
    //  },
    //  {
    //    assetTypeID: 2,
    //    year: 4,
    //    percent: 15,
    //    amount:40000
    //  },
    //  {
    //    assetTypeID: 2,
    //    year: 5,
    //    percent: 10,
    //    amount:50000
    //  }
    //]

    //successCallback(data);

    this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
      // successCallback
      (data: Depreciation[]) => {
        successCallback(data);
      }
    )
  }

  public save(productId: number, data: Depreciation, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), data,
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


}
