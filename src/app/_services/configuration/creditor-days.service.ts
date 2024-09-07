import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { ComponentModal } from '../../_models/Component.model';
import { ComponentCategory } from '../../_models/ComponentCategory.model';
import { CreditorDays } from '../../_models/creditor-days.model';
import { WebAPIService } from '../web-api.service';

@Injectable({
  providedIn: 'root'
})
export class CreditorDaysService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.creditorDays.APIName;

  public get(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: CreditorDays) => {
        successCallback(data);
      }
    )
  }

  public save(creditorDays: CreditorDays, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName, creditorDays,
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
