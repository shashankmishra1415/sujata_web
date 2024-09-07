import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { PricingMRP } from '../../../_models/pricing.model';
import { CustomModalField, CustomPromptOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';
import { ChartOptions } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-pricing-box',
  templateUrl: './pricing-box.component.html',
  styleUrls: ['./pricing-box.component.css']
})
export class PricingBoxComponent {
  @Input() mrpTitle: string = 'MRP'
  @Input() pricingMRP!: PricingMRP;
  @Input() productionCost: number = 0;

  @Output() ValuesChanged = new EventEmitter();

  chartOptionsRawMaterial: Partial<ChartOptions> = {
    series1: [0, 0, 0, 0],
    chart1: {
      type: "donut",
      width: 230,
      height: 250,
    },
    labels: ["Primary", "Secondary", "Tertiary", "Manufacturer"],
    legend: {
      show: false
    }
  };

  constructor(private customModalService: CustomModalService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    //this.pricingMRP.mrp = 1200; this.productionCost = 650;
    this.chartOptionsRawMaterial.series1 = [this.pricingMRP.primaryPercent, this.pricingMRP.secondaryPercent, this.pricingMRP.tertiaryPercent, this.pricingMRP.manufacturerPercent]
  }

  get getRetailerData(): {LandingPrice: number, Margin: number} {
    let data: { LandingPrice: number, Margin: number } = { LandingPrice: 0, Margin: 0 };
    data.LandingPrice = this.pricingMRP.mrp / ((this.pricingMRP.tertiaryPercent / 100) + 1);
    data.Margin = this.pricingMRP.mrp - data.LandingPrice;

    if (!Number.isInteger(data.LandingPrice)) {
      data.LandingPrice = +data.LandingPrice.toFixed(2);
    }

    if (!Number.isInteger(data.Margin)) {
      data.Margin = +data.Margin.toFixed(2);
    }


    return data;
  }

  get getDealerData(): {LandingPrice: number, Margin: number} {
    let data: { LandingPrice: number, Margin: number } = { LandingPrice: 0, Margin: 0 };
    data.LandingPrice = this.getRetailerData.LandingPrice / ((this.pricingMRP.secondaryPercent / 100) + 1);
    data.Margin = this.getRetailerData.LandingPrice - data.LandingPrice;

    if (!Number.isInteger(data.LandingPrice)) {
      data.LandingPrice = +data.LandingPrice.toFixed(2);
    }

    if (!Number.isInteger(data.Margin)) {
      data.Margin = +data.Margin.toFixed(2);
    }


    return data;
  }

  get getDistributorData(): {LandingPrice: number, Margin: number} {
    let data: { LandingPrice: number, Margin: number } = { LandingPrice: 0, Margin: 0 };
    data.LandingPrice = this.getDealerData.LandingPrice / ((this.pricingMRP.primaryPercent / 100) + 1);
    data.Margin = this.getDealerData.LandingPrice - data.LandingPrice;

    if (!Number.isInteger(data.LandingPrice)) {
      data.LandingPrice = +data.LandingPrice.toFixed(2);
    }

    if (!Number.isInteger(data.Margin)) {
      data.Margin = +data.Margin.toFixed(2);
    }


    return data;
  }

  get getManufacturerData(): {LandingPrice: number, Margin: number} {
    let data: { LandingPrice: number, Margin: number } = { LandingPrice: this.productionCost, Margin: 0 };
    data.Margin = this.getDistributorData.LandingPrice - data.LandingPrice;

    this.pricingMRP.manufacturerPercent = (data.Margin * 100) / data.LandingPrice;

    if (!Number.isInteger(data.LandingPrice)) {
      data.LandingPrice = +data.LandingPrice.toFixed(2);
    }

    if (!Number.isInteger(data.Margin)) {
      data.Margin = +data.Margin.toFixed(2);
    }

    if (!Number.isInteger(this.pricingMRP.manufacturerPercent)) {
      //this.pricingMRP.manufacturerPercent = +this.pricingMRP.manufacturerPercent.toFixed(2);
    }

    return data;
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  onSliderChange() {
    this.chartOptionsRawMaterial.series1 = [this.pricingMRP.primaryPercent, this.pricingMRP.secondaryPercent, this.pricingMRP.tertiaryPercent, this.pricingMRP.manufacturerPercent]

    setTimeout(() => {
      this.ValuesChanged.emit();
    }, 150);
  }


  EditMRP_Click() {
    var options: CustomPromptOptions = new CustomPromptOptions();
    options.isKeyboardEvents = true;
    options.dialogSize = 'sm';
    options.message = `Edit ${this.mrpTitle}`;
    options.DataFields = [
      {
        title: 'MRP ₹',
        type: 'text',
        value: this.pricingMRP.mrp.toString(),
        validations: ['required', 'trimOnChange'],
        colClass: 'col-md-12'
      }
    ]
    options.OkButtonText = "Submit";
    options.CancelButtonText = "Cancel";

    options.OkCallback = (DataFields: CustomModalField[], closeModal: Function) => {
      closeModal();
      if (!Number.isNaN(DataFields[0].value)) {
        this.pricingMRP.mrp = +DataFields[0].value
        this.ValuesChanged.emit();
      }
    }

    this.customModalService.prompt(options);
  }
}
