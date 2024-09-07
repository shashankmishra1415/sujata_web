import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WebAPIService {
  constructor(private http: HttpClient) { }
  url = environment.apiBaseUrl;
  get(apiName: string, parameterJSON: any = null, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    let apiUrl = this.url + "/" + apiName;

    if (parameterJSON != null) {
      let params = new URLSearchParams();
      for (let key in parameterJSON) {
        params.set(key, parameterJSON[key])
      }

      apiUrl = apiUrl + "?" + params.toString();
      //console.log(apiUrl);
    }
    this.http.get(apiUrl)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }
          // Return an observable with a user-facing error message.
          return throwError(
            'Something bad happened; please try again later.');
        })
      ).subscribe((data) => {
        if (typeof (successCallback) === 'function') {
          successCallback(data);
        }
      });
  }

  post(apiName: string, request: any = null, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    //console.log(request);
    this.http.post(this.url + "/" + apiName, request)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }
          // Return an observable with a user-facing error message.
          return throwError(
            'Something bad happened; please try again later.');
        })
      ).subscribe((data) => {
        if (typeof (successCallback) === 'function') {
          successCallback(data);
        }
      });
  }

  put(apiName: string, request: any, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    return this.http.put(this.url + "/" + apiName, request)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }
          // Return an observable with a user-facing error message.
          return throwError(
            'Something bad happened; please try again later.');
        })
      ).subscribe((data) => {
        if (typeof (successCallback) === 'function') {
          successCallback(data);
        }
      });
  }

  Delete(apiName: string, parameterJSON: any = null, headerOptions: any, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    let apiUrl = this.url + "/" + apiName;

    if (parameterJSON != null) {
      let params = new URLSearchParams();
      for (let key in parameterJSON) {
        params.set(key, parameterJSON[key])
      }

      apiUrl = apiUrl + "?" + params.toString();
      //console.log(apiUrl);
    }
    this.http.delete(apiUrl, headerOptions)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }
          // Return an observable with a user-facing error message.
          return throwError(
            'Something bad happened; please try again later.');
        })
      ).subscribe((data) => {
        if (typeof (successCallback) === 'function') {
          successCallback(data);
        }
      });
  }

  downloadFile(apiName: string, httpParams: HttpParams, fileName: string, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    let apiUrl = this.url + "/" + apiName;
    return this.http.get(apiUrl, { responseType: 'blob', params: httpParams })
      .pipe(
        catchError((error) => {
          this.handleError(error);
          if (typeof (errorCallback) === 'function') {
            errorCallback(error);
          }
          // Return an observable with a user-facing error message.
          return throwError(
            'Something bad happened; please try again later.');
        })
      ).subscribe(res => {
        const blob = new Blob([res], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, fileName);
        if (typeof (successCallback) === 'function') {
          successCallback(fileName);
        }
      });
  }

  downloadFileJSON(apiName: string, paramJSON: any = null, successCallback: Function | undefined = undefined, errorCallback: Function | undefined = undefined) {
    return this.get(apiName, paramJSON,

      // successCallback
      (data: { FileContent: Blob, FileName: string }) => {
        const blob = new Blob([data.FileContent], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, data.FileName);
        if (typeof (successCallback) === 'function') {
          successCallback(data.FileName);
        }
      },

      // errorCallback
      () => {

      }
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
  }
}
