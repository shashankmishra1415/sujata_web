import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent {
  constructor(private router: Router, private route: ActivatedRoute) { }

  next_click() {
    this.router.navigate(['products', 'list']);
  }

  prev_click() {
    this.router.navigate(['..', 'balance-sheet'], { relativeTo: this.route });
  }
}
