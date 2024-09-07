import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BalanceSheet } from '../../../_models/balance_sheet.model';
import { BalanceSheetService } from '../../../_services/products/balance-sheet.service';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css']
})
export class BalanceSheetComponent {
  ProductID: number = 0;
  BalanceSheetData!: BalanceSheet;
  constructor(private router: Router, private route: ActivatedRoute, private balanceSheetService: BalanceSheetService) { }

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
    this.balanceSheetService.get(this.ProductID,
      // successCallback
      (data: BalanceSheet) => {
        this.BalanceSheetData = data;
      }
    );
  }

  next_click() {
    this.router.navigate(['..', 'financial-summary'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'pricing'], { relativeTo: this.route });
  }
}
