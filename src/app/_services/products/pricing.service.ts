import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { WebAPIService } from '../web-api.service';
import { ComponentModal } from '../../_models/Component.model';
import { Pricing, PricingMRP } from '../../_models/pricing.model';

@Injectable({
  providedIn: 'root'
})
export class PricingService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.product.APIName + '/' + API.product.pricing.APIName;

  public get(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
      // successCallback
      (response: Pricing) => {
        successCallback(response);
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }

  public save(productId: number, mrpName: string, pricingMRP: PricingMRP, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), { ...pricingMRP, mrpName : mrpName} ,
      // successCallback
      () => {
        successCallback();
      },
      // errorCallback
      (error: any) => {
        if (errorCallback && typeof (errorCallback) === 'function') {
          errorCallback(error);
        }
      }
    );
  }
}
