import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { HSNCode } from '../../_models/hsn-code.model';
import { WebAPIService } from '../web-api.service';

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.defaultSettings.APIName;

  public getWorkingDaysInYear(successCallback: Function, errorCallback: Function | undefined = undefined) {

    this.webApiService.get(this.APIName, {
      key: 'WorkingDaysInYear'
    },
      // successCallback
      (daysInYear: number) => {
        successCallback(daysInYear);
      }
    )
  }
}
