import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { Product } from '../../_models/product.model';
import { WebAPIService } from '../web-api.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.product.APIName;
  public list(filter: { Name: string, CreatedDate: string, PageNumber: number, PageSize: number }, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, filter,
      // successCallback
      (data: Product[]) => {
        successCallback(data);
      }
    )
  }

  public delete(id: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.Delete(`${this.APIName}/${id}`, null, undefined,
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

  public clone(id: number, newName: string, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(`${this.APIName}/${API.product.clone.APIName}`, {
      productId: id,
      name: newName
    },
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

  public getById(productId: number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(`${this.APIName}/${productId}`, null,
      // successCallback
      (data: Product) => {
        successCallback(data);
      }
    )
  }

  public save(id: number, product: Product, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName, {
      name: product.name,
      factoryLocationId: product.factoryLocationId,
      piecesPerHour: product.piecesPerHour,
      workingHourPerDay: product.workingHourPerDay,
      workingDaysPerMonth: product.workingDaysPerMonth,
      productMedia: product.productMedia.map(x => { fileId: x.fileId })
    },
      // successCallback
      (product: Product) => {
        successCallback(product);
      },
      // errorCallback
      (error: any) => {
        if (typeof (errorCallback) === 'function') {
          errorCallback(error)
        }
      }
    )
  }

  public update(id: number, product: Product, successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.put(`${this.APIName}/${id}`,
      {
        name: product.name,
        factoryLocationId: product.factoryLocationId,
        piecesPerHour: product.piecesPerHour,
        workingHourPerDay: product.workingHourPerDay,
        workingDaysPerMonth: product.workingDaysPerMonth,
        productMedia: product.productMedia
      },
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
