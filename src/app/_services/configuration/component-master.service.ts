import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { ComponentModal } from '../../_models/Component.model';
import { ComponentCategory } from '../../_models/ComponentCategory.model';
import { WebAPIService } from '../web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentMasterService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.componentMaster.APIName;

  public getComponentCategories(successCallback: Function) {
    this.webApiService.get(API.configuration.componentCategories.APIName, null,
      // successCallback
      (data: ComponentCategory[]) => {
        successCallback(data);
      }
    )
  }

  public list(code: string, name: string, categoryID: number, rawMaterial: string, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, {
      Code: code,
      RawMaterial: rawMaterial,
      Name: name,
      CategoryId: categoryID,
      PageNumber: 1,
      PageSize: 10000
    },
      // successCallback
      (data: ComponentModal[]) => {
        successCallback(data);
      }
    )
  }

  public getById(id: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(`${this.APIName}/` + id, null,
      // successCallback
      (data: ComponentModal) => {
        successCallback(data);
      }
    )
  }

  public save(component: ComponentModal, successCallback: Function, errorCallback: Function | undefined = undefined) {
    if (component.id === 0) {
      this.webApiService.post(this.APIName, component,
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
      this.webApiService.put(`${this.APIName}/` + component.id, component,
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

  //public delete(id: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
  //  this.webApiService.Delete(`${this.APIName}/` + id.toString(), null, undefined,
  //    // successCallback
  //    () => {
  //      successCallback();
  //    },
  //    // errorCallback
  //    (error: any) => {
  //      if (typeof (errorCallback) === 'function') {
  //        errorCallback(error)
  //      }
  //    }
  //  )
  //}

  //public save(empCat: EmploymentCategory, successCallback: Function, errorCallback: Function | undefined = undefined) {
  //  if (empCat.id === 0) {
  //    this.webApiService.post(this.APIName, empCat,
  //      // successCallback
  //      () => {
  //        successCallback();
  //      },
  //      // errorCallback
  //      (error: any) => {
  //        if (typeof (errorCallback) === 'function') {
  //          errorCallback(error)
  //        }
  //      }
  //    )
  //  }
  //  else {
  //    this.webApiService.put(`${this.APIName}/` + empCat.id, empCat,
  //      // successCallback
  //      () => {
  //        successCallback();
  //      },
  //      // errorCallback
  //      (error: any) => {
  //        if (typeof (errorCallback) === 'function') {
  //          errorCallback(error)
  //        }
  //      }
  //    )
  //  }
  //}
}
