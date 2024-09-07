import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModal } from '../../_models/Component.model';
import { ComponentCategory } from '../../_models/ComponentCategory.model';
import { HSNCode } from '../../_models/hsn-code.model';
import { ManufacturingProcess } from '../../_models/manufacturing.model';

@Component({
  selector: 'app-component-popup',
  templateUrl: './component-popup.component.html',
  styleUrls: ['./component-popup.component.css']
})
export class  ComponentPopupComponent implements OnChanges, OnInit {
  @Input() categories: ComponentCategory[] = [];
  @Input() manufacturingProcesses: ManufacturingProcess[] = [];
  @Input() component!: ComponentModal
  @Input() hsnCodes: HSNCode[] = [];

  isNaN = isNaN;
  isSubmitClicked: boolean = false;

  items = [
    { id: 'a1', name: 'Item 1' },
    { id: 'string220', name: 'string220' },
    { id: 'a3', name: 'Item 3' },
    // Add more items as needed
  ];

  selectedItem: any;
  constructor(private activeModal: NgbActiveModal) {
    
  }

  onSelectionChange() {
    // Handle the selection change here
    console.log('Selected Item:', this.selectedItem);
  }

  ngOnInit(): void {
    this.cleanObject();
  }

  cleanObject() {
    this.component.componentManufacturingCosts.forEach((cost, costIndex) => {
      if (this.manufacturingProcesses.filter(x => x.id === cost.manufacturingProcessId).length === 0) {
        this.component.componentManufacturingCosts.splice(costIndex, 1);
      }
    })

    this.manufacturingProcesses.forEach((process, processIndex) => {
      if (this.component.componentManufacturingCosts.filter(x => x.manufacturingProcessId === process.id).length === 0) {
        this.component.componentManufacturingCosts.push({
          manufacturingProcessId: process.id,
          cost: 0
        })
      }
    })
  }

  getManufacturingProcessByID(id: number): ManufacturingProcess {
    if (this.manufacturingProcesses.filter(x => x.id === id).length > 0) {
      return this.manufacturingProcesses.filter(x => x.id === id)[0]
    }
    else {
      return {id: 1, name: 'test'}
    }
  }

  HSNCodeLabel(hsnCode: any): string {
    return `${hsnCode.hsnCode} - ${hsnCode.description}`;
  }

  validate(): boolean {
    let isValid = true
    if (this.component.code === null || this.component.code.trim() === '') {
      isValid = false;
    }
    else if (this.component.name.trim() === '') {
      isValid = false;
    }
    else if (this.component.categoryId === 0) {
      isValid = false;
    }
    else if (this.component.rawMaterial.trim() === '') {
      isValid = false;
    }
    else if (this.component.unitPrice === 0) {
      isValid = false;
    }
    else if (isNaN(this.component.subComponentCount)) {
      isValid = false;
    }

    return isValid;
  }

  save_click(e: any) {
    e.preventDefault();
    this.isSubmitClicked = true;
    if (this.validate()) {
      this.activeModal.close({ isSuccess: true, component: this.component });
    }
    else {

    }
  }

  cancel_click(e: any) {
    e.preventDefault();
    this.activeModal.close({ isSuccess: false });
  }

  dismiss_click(e: any) {
    e.preventDefault();
    this.activeModal.dismiss();
  }

  ngOnChanges(changes: SimpleChanges) {
    let _isChanged = false;
    if (changes["categories"] !== undefined && changes["categories"].currentValue !== changes["categories"].previousValue) {
      _isChanged = true;
      this.categories = changes["categories"].currentValue;
    }

    if (changes["manufacturingProcesses"] !== undefined && changes["manufacturingProcesses"].currentValue !== changes["manufacturingProcesses"].previousValue) {
      _isChanged = true;
      this.manufacturingProcesses = changes["manufacturingProcesses"].currentValue;
    }

    if (changes["component"] !== undefined && changes["component"].currentValue !== changes["component"].previousValue) {
      this.component = changes["component"].currentValue;
    }

    if (_isChanged === true) {
      // code to load data
      this.cleanObject();
    }
  }
}
