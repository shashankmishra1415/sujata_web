import { Injectable } from '@angular/core';
import { WebAPIService } from '../web-api.service';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/_models/API';
import { AssetType } from 'src/app/_models/asset_type.model';
import { Asset } from '../../_models/assets.model';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = `${API.product.APIName}/${API.product.assets.APIName}`;
  public list(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
      // successCallback
      (data: {
        assetTypes: AssetType[],
        data: Asset[]
      }) => {
        successCallback(data);
      }
    )
  }

  public save(productId: number, asset: Asset, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), asset,
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
