import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SaleForecast } from '../../../_models/SaleForecast.model';

@Component({
  selector: 'app-sales-forecast-popup',
  templateUrl: './sales-forecast-popup.component.html',
  styleUrls: ['./sales-forecast-popup.component.css']
})
export class SalesForecastPopupComponent {
  SalesForecast: SaleForecast[] = [];
  years = Array(5).fill(0).map((x, i) => i + 1);
  months = Array(12).fill(0).map((x, i) => i + 1);

  constructor(private activeModal: NgbActiveModal) { 
  }

  getMonthItem(month: number): SaleForecast {
    console.log(this.SalesForecast);
    return this.SalesForecast.filter(x => x.month === month)[0];
  }

  getTotalByYear(year: number): number {
    let sum = 0;
    this.SalesForecast.filter(x => x.month >= ((year - 1) * 12) + 1 && x.month <= year * 12).forEach(saleItem => {
      sum += +saleItem.quantity;
    });
    return sum;
  }

  incrementYearQtyByPercent(e: any, year: number) {
    debugger;
    for (var month = ((year - 1) * 12) + 1; month <= year * 12; month++) {
      let currMonthItem = this.SalesForecast.filter(x => x.month === month)[0];
      let prevMonthItem = this.SalesForecast.filter(x => x.month === month - 12)[0];

      currMonthItem.quantity = Math.round(+prevMonthItem.quantity + (+e.target.value / 100 * +prevMonthItem.quantity));
    }
  }

  ngOnInit(): void {
  }

  save_click(e:any){
    e.preventDefault();
    this.activeModal.close({ isSuccess: true, data: this.SalesForecast });
  }

  cancel_click(e: any) {
    e.preventDefault();
    this.activeModal.close({ isSuccess: false });
  }

  dismiss_click(e: any) {
    e.preventDefault();
    this.activeModal.dismiss();
  }

}

