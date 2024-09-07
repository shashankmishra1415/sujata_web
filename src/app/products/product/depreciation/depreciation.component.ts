import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Depreciation } from 'src/app/_models/depreciation.model';
import { DepreciationService } from 'src/app/_services/products/depreciation.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-depreciation',
  templateUrl: './depreciation.component.html',
  styleUrls: ['./depreciation.component.css']
})
export class DepreciationComponent {
  ProductID: number = 0;
  DepreciationData: Depreciation[] = [];
  constructor(private toastr: ToastrService, private depreciationService: DepreciationService, private router: Router, private route: ActivatedRoute) {

  }
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
    this.depreciationService.list(this.ProductID, (data: Depreciation[]) => {
      this.DepreciationData = data
    });
  }
  item_changed(deprePercent: Depreciation) {
    if ((deprePercent.percent !== null || undefined) && deprePercent.percent.toString().trim() !== '' && !Number.isNaN(deprePercent.percent)) {
      this.depreciationService.save(this.ProductID, deprePercent,
        // successCallback
        () => {
          this.toastr.success('Item successfully updated', 'Depreciation');
        }
      )
    }
  }

  next_click() {
    this.router.navigate(['..', 'sales-forecast'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'assets'], { relativeTo: this.route });
  }
}
