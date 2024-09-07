import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { WebAPIService } from '../web-api.service';
import { FactoryLocation } from 'src/app/_models/FactoryLocation.models';

@Injectable({
  providedIn: 'root'
})
export class FactoryLocationService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.factoryLocations.APIName;

  public list(successCallback: Function) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: FactoryLocation[]) => {
        successCallback(data);
      }
    )
  }
}
