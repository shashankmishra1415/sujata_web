import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../_models/API';
import { EmploymentCategory } from '../../../_models/employment_category.model';
import { WebAPIService } from "../../web-api.service";

@Injectable({
  providedIn: 'root'
})
export class EmploymentCategoryService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.lookups.employmentCategory.APIName;
  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: EmploymentCategory[]) => {
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

  public save(empCat: EmploymentCategory, successCallback: Function, errorCallback: Function | undefined = undefined) {
    if (empCat.id === 0) {
      this.webApiService.post(this.APIName, empCat,
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
      this.webApiService.put(`${this.APIName}/` + empCat.id, empCat,
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
