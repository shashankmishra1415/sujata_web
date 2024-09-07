import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../_models/API';
import { ExpenseHead } from '../../../_models/expense_head.model';
import { WebAPIService } from "../../web-api.service";

@Injectable({
  providedIn: 'root'
})
export class ExpenseHeadService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.lookups.expenseHead.APIName;

  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: ExpenseHead[]) => {
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

  public save(expenseHead: ExpenseHead, successCallback: Function, errorCallback: Function | undefined = undefined) {
    if (expenseHead.id === 0) {
      this.webApiService.post(this.APIName, expenseHead,
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
      this.webApiService.put(`${this.APIName}/` + expenseHead.id, expenseHead,
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
