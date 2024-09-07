import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesForecastPopupComponent } from '../sales-forecast-popup/sales-forecast-popup.component';
import { SalesForecastService } from 'src/app/_services/products/sales-forecast.service';
import { SaleForecast } from 'src/app/_models/SaleForecast.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-sales-forecast',
  templateUrl: './sales-forecast.component.html',
  styleUrls: ['./sales-forecast.component.css']
})
export class SalesForecastComponent {
  ProductID: number = 0;
  constructor(private modalService: NgbModal, private salesForecastService: SalesForecastService, private router: Router, private route: ActivatedRoute) {
  }

  salesData!: {
    salesForecasts: SaleForecast[],
    pricingInformations: {
      name: string,
      price: number
    }[]
  };

  years = Array(5).fill(0).map((x, i) => i + 1);

  ngOnInit(): void {
    if (this.route.parent) {
      this.route.parent.params.subscribe(
        (params: Params) => {
          if (params["id"]) {
            this.ProductID = params["id"];
          }
        }
      );
    }
    this.loadData();
  }

  loadData() {
    this.salesForecastService.list(this.ProductID,
      //successCallback
      (data: {
        salesForecasts: SaleForecast[],
        pricingInformations: {
          name: string,
          price: number
        }[]
      }) => {
        this.salesData = data;
        this.fixMissingMonths();
      }
    )
  }

  fixMissingMonths() {
    this.salesForecastService.fixMissingMonths(this.salesData.salesForecasts);
  }

  getQuantityByYear(year: number): number {
    return this.salesForecastService.getQuantityByYear(year, this.salesData.salesForecasts);
  }

  getYearIncrementPercent(year: number): number {
    return this.salesForecastService.getYearIncrementPercent(year, this.salesData.salesForecasts);
  }

  getSaleValue(year: number, mrp: number): number {
    let amount = this.getQuantityByYear(year) * mrp;
    if (Number.isNaN(amount)) {
      return 0;
    }
    else if (Number.isInteger(amount)) {
      return amount;
    }
    else {
      return +amount.toFixed(2);
    }
  }

  btnEdit_click() {
    const modalRef = this.modalService.open(SalesForecastPopupComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });
    modalRef.componentInstance.SalesForecast = JSON.parse(JSON.stringify(this.salesData.salesForecasts));
    modalRef.result.then((response: {
      isSuccess: boolean, data: SaleForecast[]
    }) => {
      if (response.isSuccess) {
        this.salesForecastService.save(this.ProductID, response.data,
          // successCallback
          () => {
            this.loadData();
          }
        )
      }
    }).catch(() => {
    });
  }

  next_click() {
    this.router.navigate(['..', 'pricing'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'depreciation'], { relativeTo: this.route });
  }
}
