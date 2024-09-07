import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebAPIService } from './web-api.service';
import { API } from '../_models/API';
import { State } from '../_models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = API.state.APIName;

  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.get(this.APIName, null,
      // successCallback
      (data: State[]) => {
        successCallback(data);
      }
    )
  }
}
