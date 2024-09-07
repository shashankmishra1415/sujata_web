import { Component, ElementRef, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { FactoryLocation } from '../../../_models/FactoryLocation.models';
import { Product } from '../../../_models/product.model';
import { DefaultSettingsService } from '../../../_services/configuration/default-settings.service';
import { FactoryLocationService } from '../../../_services/products/factory-location.service';
import { ProductService } from '../../../_services/products/products.service';

@Component({
  selector: 'app-production-capacity',
  templateUrl: './production-capacity.component.html',
  styleUrls: ['./production-capacity.component.css']
})
export class ProductionCapacityComponent {
  ProductID: number = 0;
  product: Product = {
    id: 0,
    name: '',
    factoryLocationId: 0,
    createdDate: new Date(),
    piecesPerHour: 0,
    workingHourPerDay: 0,
    workingDaysPerMonth: 0,
    productMedia: []
  };
  daysInYear: number = 0;

  Locations: FactoryLocation[] = [];

  saveInProgress = false;

  //selectedFileUrls: SafeUrl[] = [];
  //showSelectedImages = false;
  //imageWidth = '145px';
  //imageHeight = '145px';
  //selectedFiles: { file: File, name: string, size: number }[] = [];
  //isDzMessageVisible = true;
  //imageToDeleteIndex: number = -1;

  workingHrDay: number = 0;
  workingHrMonth: number = 0;
  workingHrYear: number = 0;

  piecesPerDay: number = 0;
  piecesPerMonth: number = 0;
  piecesPerYear: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private el: ElementRef, private defaultSettingService: DefaultSettingsService, private factoryLocationService: FactoryLocationService, private productService: ProductService) {
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
    this.loadFactoryLocations();
    this.loadData();

    this.defaultSettingService.getWorkingDaysInYear(
      // successCallback
      (daysInYear: number) => {
        this.daysInYear = daysInYear
        this.calculate_click();
      });
  }

  loadFactoryLocations() {
    this.factoryLocationService.list(
      // successCallback
      (data: FactoryLocation[]) => {
        this.Locations = data;
      }
    )
  }

  loadData() {
    if (this.ProductID !== 0) {
      this.productService.getById(this.ProductID,
        // successCallback
        (data: Product) => {
          this.product = data;

          this.calculate_click();
        }
      );
    }
  }

  calculate_click() {
    this.workingHrDay = this.product.workingHourPerDay;
    this.workingHrMonth = this.product.workingHourPerDay * this.product.workingDaysPerMonth;
    this.workingHrYear = this.product.workingHourPerDay * this.daysInYear;

    this.piecesPerDay = this.product.piecesPerHour * this.product.workingHourPerDay;
    this.piecesPerMonth = this.product.workingHourPerDay * this.product.workingDaysPerMonth * this.product.piecesPerHour;
    this.piecesPerYear = this.product.workingHourPerDay * this.daysInYear * this.product.piecesPerHour;
  }

  validate() {
    return true;
  }

 // @HostListener('document:click', ['$event'])
  //onDocumentClick(event: MouseEvent): void {
  //  if (this.isDzMessageVisible) {
  //    const imageCardElement = this.el.nativeElement.querySelector('.image-card');
  //    const fileInputElement = this.el.nativeElement.querySelector('#fileInput');
  //    if (imageCardElement && fileInputElement) {
  //      if (!imageCardElement.contains(event.target as Node)) {
  //        // Trigger the file input click only if the click occurred outside the "image-card" area
  //        fileInputElement.click();
  //        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  //      }
  //    }
  //  }
  //}
  next_click() {
    if (!this.saveInProgress) {
      this.saveInProgress = true;
      if (this.validate()) {
        if (this.ProductID === 0) {
          this.productService.save(this.ProductID, this.product,
            // successCallback
            (product: Product) => {
              this.product.id = product.id
              this.product.productMedia = product.productMedia
              this.saveInProgress = false;
              this.router.navigate(['products', this.product.id, 'head-count']);
            }
          )
        }
        else {
          this.productService.update(this.ProductID, this.product,
            // successCallback
            () => {
              this.saveInProgress = false;
              this.router.navigate(['..', 'head-count'], { relativeTo: this.route });
            }
          )
        }
      }
      else {
        this.saveInProgress = false;
      }
      //this.router.navigate(['products', '1', 'head-count']);
    }
  }
}
