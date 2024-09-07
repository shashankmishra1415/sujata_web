import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pricing, PricingMRP } from '../../../_models/pricing.model';
import { CustomModalField, CustomPromptOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';
import { PricingService } from '../../../_services/products/pricing.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  ProductID: number = 0;
  pricingData!: Pricing
  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService, private customModalService: CustomModalService, private pricingService: PricingService) { }
  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(
        (params: Params) => {
          if (params["id"]) {
            this.ProductID = params["id"];
          }
        }
      );
    }


    this.loadPricingData();
  }

  loadPricingData() {
    this.pricingService.get(this.ProductID,
      // successCallback
      (data: Pricing) => {
        this.pricingData = data;
      }
    )
  }

  saveMRP(mrpName: string) {
    let pricingMRP!: PricingMRP;
    switch (mrpName) {
      case 'mrp1': pricingMRP = this.pricingData.pricing.mrp1;
        break;
      case 'mrp2': pricingMRP = this.pricingData.pricing.mrp2;
        break;
      case 'mrp3': pricingMRP = this.pricingData.pricing.mrp3;
        break;
    }

    if (pricingMRP !== undefined) {
      this.pricingService.save(this.ProductID, mrpName, pricingMRP,
        // successCallback
        () => {
          this.toastr.success('MRP Saved Successfully', 'Pricing');
        }
      );
    }
  }

  add_click(mrpName: string, mrpTitle: string) {
    var options: CustomPromptOptions = new CustomPromptOptions();
    options.isKeyboardEvents = true;
    options.dialogSize = 'sm';
    options.message = `Add ${mrpTitle}`;
    options.DataFields = [
      {
        title: 'MRP ₹',
        type: 'text',
        value: '0',
        validations: ['required', 'trimOnChange'],
        colClass: 'col-md-12'
      }
    ]
    options.OkButtonText = "Submit";
    options.CancelButtonText = "Cancel";

    options.OkCallback = (DataFields: CustomModalField[], closeModal: Function) => {
      closeModal();
      if (!Number.isNaN(DataFields[0].value)) {

        let _pricingMRP: PricingMRP = {
          mrp: +DataFields[0].value,
          primaryPercent: 0,
          secondaryPercent: 0,
          tertiaryPercent: 0,
          manufacturerPercent: 0
        }

        switch (mrpName) {
          case 'mrp1':
            this.pricingData.pricing.mrp1 = _pricingMRP;
            this.saveMRP(mrpName)
            break;
          case 'mrp2':
            this.pricingData.pricing.mrp2 = _pricingMRP;
            this.saveMRP(mrpName)
            break;
          case 'mrp3':
            this.pricingData.pricing.mrp3 = _pricingMRP;
            this.saveMRP(mrpName)
            break;
        }
      }
    }

    this.customModalService.prompt(options);
  }

  change(mrpName: string) {
    this.saveMRP(mrpName);
  }

  next_click() {
    this.router.navigate(['..', 'balance-sheet'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'sales-forecast'], { relativeTo: this.route });
  }
}
