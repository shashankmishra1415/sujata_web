import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../_models/API';
import { HSNCode } from '../../_models/hsn-code.model';
import { WebAPIService } from '../web-api.service';

@Injectable({
  providedIn: 'root'
})
export class HSNCodeService {
  constructor(private webApiService: WebAPIService) { }
  APIName = API.configuration.hsnCode.APIName;

  public list(successCallback: Function, errorCallback: Function | undefined = undefined) {

    var data: HSNCode[] = [
      {
        id: 1,
        hsnCode: 'C001',
        description: 'description one'
      },
      {
        id: 2,
        hsnCode: 'C002',
        description: 'description two'
      },
      {
        id: 3,
        hsnCode: 'C003',
        description: 'description three'
      },
      {
        id: 4,
        hsnCode: 'C004',
        description: 'description four'
      },
      {
        id: 5,
        hsnCode: 'C005',
        description: 'description five'
      }
    ];

    successCallback(data);


  //  this.webApiService.get(this.APIName, null,
  //    // successCallback
  //    (data: HSNCode[]) => {
  //      successCallback(data);
  //    }
  //  )
  }
}
