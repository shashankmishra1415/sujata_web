import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/_models/API';
import { WebAPIService } from '../web-api.service';
import { Headcount } from 'src/app/_models/headcount.model';

@Injectable({
  providedIn: 'root'
})
export class HeadcountService {

  constructor(private http: HttpClient, private webApiService: WebAPIService) { }
  APIName = API.product.APIName + '/' + API.product.headcount.APIName;
  public list(productId: Number, successCallback: Function, errorCallback: Function | undefined = undefined) {
    //var data: Headcount[] = [
    //  {
    //    Year: 1,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Skilled",
    //    Count: 10,
    //    subCategorySalary: 1000
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Skilled",
    //    Count: 20,
    //    subCategorySalary: 1000
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Skilled",
    //    Count: 30,
    //    subCategorySalary: 1000
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Skilled",
    //    Count: 40,
    //    subCategorySalary: 1000
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Skilled",
    //    Count: 50,
    //    subCategorySalary: 1000
    //  },
    //  {
    //    Year: 1,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnSkilled",
    //    Count: 13,
    //    subCategorySalary: 2000
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnSkilled",
    //    Count: 14,
    //    subCategorySalary: 2000
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnSkilled",
    //    Count: 15,
    //    subCategorySalary: 2000
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnSkilled",
    //    Count: 16,
    //    subCategorySalary: 2000
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnSkilled",
    //    Count: 17,
    //    subCategorySalary: 2000
    //  },
    //  {
    //    Year: 1,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 3,
    //    SubCategoryName:"SemiSkilled",
    //    Count: 31,
    //    subCategorySalary: 3000
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 3,
    //    SubCategoryName:"SemiSkilled",
    //    Count: 32,
    //    subCategorySalary: 3000
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 3,
    //    SubCategoryName:"SemiSkilled",
    //    Count: 33,
    //    subCategorySalary: 3000
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 3,
    //    SubCategoryName:"SemiSkilled",
    //    Count: 34,
    //    subCategorySalary: 3000
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 1,
    //    CategoryName:"Skilled,Unskilled,SemiSkilled",
    //    SubCategoryID: 3,
    //    SubCategoryName:"SemiSkilled",
    //    Count: 35,
    //    subCategorySalary: 3000
    //  },
    //  {
    //    Year: 1,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Graduate",
    //    Count: 51,
    //    subCategorySalary: 5000
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Graduate",
    //    Count: 52,
    //    subCategorySalary: 5000
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Graduate",
    //    Count: 53,
    //    subCategorySalary: 5000
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Graduate",
    //    Count: 54,
    //    subCategorySalary: 5000
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 1,
    //    SubCategoryName:"Graduate",
    //    Count: 55,
    //    subCategorySalary: 5000
    //  },
    //  {
    //    Year: 1,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnderGraduate",
    //    Count: 61,
    //    subCategorySalary: 7000
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnderGraduate",
    //    Count: 62,
    //    subCategorySalary: 7000
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnderGraduate",
    //    Count: 63,
    //    subCategorySalary: 7000
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnderGraduate",
    //    Count: 64,
    //    subCategorySalary: 7000
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 2,
    //    SubCategoryName:"UnderGraduate",
    //    Count: 65,
    //    subCategorySalary: 7000
    //  },
    //  {
    //    Year: 1,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 3,
    //    SubCategoryName:"12th Pass",
    //    Count: 81,
    //    subCategorySalary: 799
    //  },
    //  {
    //    Year: 2,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 3,
    //    SubCategoryName:"12th Pass",
    //    Count: 82,
    //    subCategorySalary: 799
    //  },
    //  {
    //    Year: 3,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 3,
    //    SubCategoryName:"12th Pass",
    //    Count: 83,
    //    subCategorySalary: 799
    //  },
    //  {
    //    Year: 4,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 3,
    //    SubCategoryName:"12th Pass",
    //    Count: 84,
    //    subCategorySalary: 799
    //  },
    //  {
    //    Year: 5,
    //    CategoryID: 2,
    //    CategoryName:"Graduate,UnderGraduate,12th Pass",
    //    SubCategoryID: 3,
    //    SubCategoryName:"12th Pass",
    //    Count: 85,
    //    subCategorySalary: 799
    //  }
    //];
    //successCallback(data);
    this.webApiService.get(this.APIName.replace('{id}', productId.toString()), null,
      // successCallback
      (data: Headcount[]) => {
        successCallback(data);
      }
    )
  }

  public save(productId: Number, headData: Headcount[], successCallback: Function, errorCallback: Function | undefined = undefined) {
    this.webApiService.post(this.APIName.replace('{id}', productId.toString()), headData,
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
