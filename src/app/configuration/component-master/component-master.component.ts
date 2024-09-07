import { Component, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModal } from '../../_models/Component.model';
import { ComponentCategory } from '../../_models/ComponentCategory.model';
import { HSNCode } from '../../_models/hsn-code.model';
import { ManufacturingProcess } from '../../_models/manufacturing.model';
import { ComponentMasterService } from '../../_services/configuration/component-master.service';
import { HSNCodeService } from '../../_services/configuration/hsn-code.service';
import { ManufacturingService } from '../../_services/configuration/lookups/manufacturing.service';
import { CustomPromptFileOptions } from '../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../_services/custom-modal/custom-modal.service';
import { ComponentPopupComponent } from '../component-popup/component-popup.component';

@Component({
  selector: 'app-component-master',
  templateUrl: './component-master.component.html',
  styleUrls: ['./component-master.component.css']
})
export class ComponentMasterComponent {
  Categories: ComponentCategory[] = []
  Components: ComponentModal[] = [];
  HSNCodes: HSNCode[] = [];

  filter: {
    code: string,
    name: string,
    categoryId: number,
    rawMaterial: string
  } = {
    code: '',
    name: '',
    categoryId: 0,
    rawMaterial: ''
  }
  constructor(private modalService: NgbModal, private hsnCodeService: HSNCodeService, private componentMasterService: ComponentMasterService, private el: ElementRef, private manufacturingProcessService: ManufacturingService, private customModalService: CustomModalService) {

  }

  ngOnInit(): void {
    this.loadCategories()
    this.loadComponents();
    this.loadHsnCodes();
  }

  loadCategories() {
    this.componentMasterService.getComponentCategories(
      // successCallback
      (data: ComponentCategory[]) => {
        this.Categories = data;
      }
    )
  }

  loadHsnCodes() {
    this.hsnCodeService.list(
      // successCallback
      (data: HSNCode[]) => {
        this.HSNCodes = data;
      }
    )
  }

  loadComponents() {
    this.componentMasterService.list(this.filter.code, this.filter.name, this.filter.categoryId,this.filter.rawMaterial,
      // successCallback
      (data: ComponentModal[]) => {
        this.Components = data;
      }
    )
  }

  filter_click() {
    this.loadComponents();
  }

  clear_click() {
    this.filter.code = '';
    this.filter.name = '';
    this.filter.categoryId = 0;
    this.filter.rawMaterial = '';

    this.loadComponents()
  }

  GetCategoryByID(id: number): ComponentCategory {
    if (id === undefined) {
      return this.Categories[0];
    }
    return this.Categories.filter(x => x.id === id)[0];
  }

  btnAdd_click() {
    let component: ComponentModal = {
      id: 0,
      code: '',
      name: '',
      categoryId: 0,
      rawMaterial: '',
      unitPrice: 0,
      subComponentCount: 0,
      componentManufacturingCostTotal: 0,
      componentManufacturingCosts: []
    }
    this.showEditModal(component)
  }

  editComponent_Click(component: ComponentModal) {
    this.componentMasterService.getById(component.id,
      // successCallback
      (_component: ComponentModal) => {
        this.showEditModal(_component)
      }
    )
  }

  showEditModal(component: ComponentModal) {
    this.manufacturingProcessService.list(
      // successCallback
      (_manufacturingProcesses: ManufacturingProcess[]) => {
        const modalRef = this.modalService.open(ComponentPopupComponent, {
          size: 'lg',
          centered: true,
          backdrop: 'static',
          keyboard: true
        });
        modalRef.componentInstance.categories = this.Categories;
        modalRef.componentInstance.hsnCodes = this.HSNCodes;
        modalRef.componentInstance.manufacturingProcesses = _manufacturingProcesses
        modalRef.componentInstance.component = component;
        modalRef.result.then((response: { isSuccess: boolean, component: ComponentModal }) => {
          if (response.isSuccess) {

            this.componentMasterService.save(response.component,
              // successCallback
              () => {
                this.loadComponents();
              }
            )
          }
        }).catch(() => {
        });
      }
    )
  }

  import_click(e: any) {
    e.preventDefault();
    let customPromptFileOptions: CustomPromptFileOptions = new CustomPromptFileOptions();
    customPromptFileOptions.isShowHeaderCloseButton = false;
    customPromptFileOptions.isShowDownloadButton = true;
    customPromptFileOptions.title = 'Bulk Import Products';
    customPromptFileOptions.message = 'Please follow instructions below to import multiple products in one go, using Excel';
    customPromptFileOptions.isMultipleFiles = true;
    customPromptFileOptions.OkButtonText = "Upload";
    customPromptFileOptions.DownloadCallback = () => {
    }
    this.customModalService.promptFile(customPromptFileOptions);
  }

  ngAfterViewInit() {
    this.addCustomClassToTable();
  }

  addCustomClassToTable() {
    const tableElement = this.el.nativeElement.querySelector('.p-datatable-table');
    if (tableElement) {
      tableElement.classList.add('table');
      tableElement.classList.add('dataTable');
    }
  }
}
