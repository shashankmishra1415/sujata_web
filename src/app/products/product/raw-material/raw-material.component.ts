import { Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentCategory } from 'src/app/_models/ComponentCategory.model';
import { RawMaterialModel, RawMaterialSaveModel } from 'src/app/_models/RawMaterial.model';
import { RawMaterialService } from 'src/app/_services/products/raw-material.service';
import { RawmaterialPopupComponent } from '../rawmaterial-popup/rawmaterial-popup.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComponentMasterService } from '../../../_services/configuration/component-master.service';
import { ComponentModal } from '../../../_models/Component.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-raw-material',
  templateUrl: './raw-material.component.html',
  styleUrls: ['./raw-material.component.css']
})
export class RawMaterialComponent implements OnInit {
  ProductID: number = 0;
  Categories: ComponentCategory[] = []
  RawMaterials: RawMaterialModel[] = [];
  Components: ComponentModal[] = [];

  constructor(private modalService: NgbModal, private toastrService: ToastrService, private rawMaterialService: RawMaterialService, private componentService: ComponentMasterService, private router: Router, private route: ActivatedRoute) {
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

    this.loadCategories()
    this.loadRawmaterials();
    this.loadComponents();
  }

  loadCategories() {
    this.componentService.getComponentCategories(
      // successCallback
      (data: ComponentCategory[]) => {
        this.Categories = data;
      }
    )
  }

  loadRawmaterials() {
    this.rawMaterialService.list(this.ProductID,
      // successCallback
      (data: RawMaterialModel[]) => {
        this.RawMaterials = data;
      }
    )
  }

  loadComponents() {
    this.componentService.list('', '', 0, '',
      // successCallback
      (data: ComponentModal[]) => {
        this.Components = data;
      }
    )
  }

  GetCategoryByID(id: number): ComponentCategory {
    return this.Categories.filter(x => x.id === id)[0];
  }

  get totalInHouseCost(): number {
    return this.rawMaterialService.totalInHouseCost(this.RawMaterials, this.Components);
  }

  get totalOutSourcedCost(): number {
    return this.rawMaterialService.totalOutSourcedCost(this.RawMaterials, this.Components);
  }

  get inHousePercent(): number {
    return this.rawMaterialService.inHousePercent(this.RawMaterials, this.Components);
  }

  get outSourcePercent(): number {
    return this.rawMaterialService.outSourcePercent(this.RawMaterials, this.Components);
  }

  totalCostByCategoryID(categoryId: number): number {
    return this.rawMaterialService.totalCostByCategoryID(categoryId, this.RawMaterials, this.Components);
  }

  totalCost(): number {
    return this.rawMaterialService.totalCost(this.RawMaterials, this.Components);
  }

  calculateComponentCostByQuantity(rawMaterial: RawMaterialModel): number {
    let comp = this.Components.filter(x => x.id === rawMaterial.componentId)[0];
    if (rawMaterial.isOutSourced) {
      return comp.unitPrice * rawMaterial.quantity;
    }
    else {
      return (comp.unitPrice + comp.componentManufacturingCostTotal) * rawMaterial.quantity;
    }
  }

  updateData(rawmaterial: RawMaterialModel) {
    let _rawMaterial: RawMaterialSaveModel = {
      componentId: rawmaterial.componentId,
      isOutSourced: rawmaterial.isOutSourced,
      quantity: rawmaterial.quantity
    }
    this.rawMaterialService.update(this.ProductID, rawmaterial.id, _rawMaterial,
      // successCallback
      () => {
        this.toastrService.success('Item updated successfully', 'Raw Material')
      }
    )
  }

  addBtn_click() {
    const modalRef = this.modalService.open(RawmaterialPopupComponent, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true
    });

    modalRef.componentInstance.categories = this.Categories;
    modalRef.componentInstance.components = this.Components.map(item => ({ ...item, isSelected: false }));
    modalRef.result.then((response: {
      isSuccess: boolean, components: {
        id: number;
        code: string;
        name: string;
        categoryId: number;
        unitPrice: number;
        isSelected: boolean;
      }[]
    }) => {
      if (response.isSuccess && (response.components !== undefined || null) && response.components.length !== 0) {
        debugger
        let _rawMaterials: RawMaterialSaveModel[] = [];
        response.components.forEach(item => {
          _rawMaterials.push({
            componentId: item.id,
            isOutSourced: false,
            quantity: 0
          })
        });
        this.rawMaterialService.save(this.ProductID, _rawMaterials,
          // successCallback
          () => {
            if (_rawMaterials.length === 1) {
              this.toastrService.success('Component added successfully', 'Raw Material')
            }
            else {
              this.toastrService.success('Components added successfully', 'Raw Material')
            }
            this.loadRawmaterials();
          }
        )
      }
    }).catch(() => {
    });
  }

  next_click() {
    this.router.navigate(['..', 'assets'], { relativeTo: this.route });
  }

  prev_click() {
    this.router.navigate(['..', 'head-count'], { relativeTo: this.route });
  }
}
