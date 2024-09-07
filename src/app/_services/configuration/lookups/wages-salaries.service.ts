import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAPIService } from '../../web-api.service';
import { API } from 'src/app/_models/API';
import { WagesSalaries } from 'src/app/_models/wages_salaries.model';

@Injectable({
  providedIn: 'root'
})
export class WagesSalariesService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = API.configuration.lookups.wagesAndSalariesProcess.APIName;

  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: WagesSalaries[]) => {
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

  public save(wageSalarie: WagesSalaries, successCallback: Function, errorCallback: Function | undefined = undefined) {
    if (wageSalarie.id === 0) {
      this.webApiService.post(this.APIName, wageSalarie,
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
      this.webApiService.put(`${this.APIName}/` + wageSalarie.id, wageSalarie,
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
