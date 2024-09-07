import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../_models/API';
import { ManufacturingProcess } from '../../../_models/manufacturing.model';
import { WebAPIService } from "../../web-api.service";

@Injectable({
  providedIn: 'root'
})
export class ManufacturingService {
  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = API.configuration.lookups.manufacturingProcess.APIName;

  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: ManufacturingProcess[]) => {
        successCallback(data);
      }
    )
  }

  public delete(id: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.Delete(`${this.APIName}/` + id.toString(), null, undefined,
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

  public save(manuProc: ManufacturingProcess, successCallback: Function, errorCallback: Function | undefined = undefined) {
    if (manuProc.id === 0) {
      this.webApiService.post(this.APIName, manuProc,
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
    else {
      this.webApiService.put(`${this.APIName}/` + manuProc.id, manuProc,
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
}
