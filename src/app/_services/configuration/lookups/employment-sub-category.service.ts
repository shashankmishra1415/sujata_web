import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../_models/API';
import { EmploymentSubCategory } from '../../../_models/employment_sub_category.model';
import { WebAPIService } from "../../web-api.service";

@Injectable({
  providedIn: 'root'
})
export class EmploymentSubCategoryService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.lookups.employmentSubCategory.APIName;
  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: EmploymentSubCategory[]) => {
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

  public save(empCat: EmploymentSubCategory, successCallback: Function, errorCallback: Function | undefined = undefined) {
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
