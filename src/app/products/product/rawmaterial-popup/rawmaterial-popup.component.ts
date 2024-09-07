import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RawMaterialService } from 'src/app/_services/products/raw-material.service';
import { ComponentModal } from '../../../_models/Component.model';
import { ComponentCategory } from '../../../_models/ComponentCategory.model';

@Component({
  selector: 'app-rawmaterial-popup',
  templateUrl: './rawmaterial-popup.component.html',
  styleUrls: ['./rawmaterial-popup.component.css']
})
export class RawmaterialPopupComponent {
  @Input() components!: {
    id: number;
    code: string;
    name: string;
    categoryId: number;
    unitPrice: number;
    isSelected: boolean;
  }[];
  @Input() categories!:ComponentCategory[];
  
  constructor(private activeModal: NgbActiveModal, private rawMaterialService: RawMaterialService) {
  }

  ngOnInit(): void {
  }

  get chkSelectAll() {
    let selectedCount = this.components.filter(x => x.isSelected).length;
    let unSelectedCount = this.components.filter(x => !x.isSelected).length;

    if (this.components.length !== 0) {
      if (unSelectedCount > 0) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }
  set chkSelectAll(value: boolean) {
    this.components.forEach(x => {
      x.isSelected = value
    })
  }

  getCategoryById(categoryId: number) {
    return this.categories.filter(x => x.id === categoryId)[0];
  }

  add_click(e: any) {
    e.preventDefault();
    if (this.components.filter(x => x.isSelected === true).length > 0) {
      this.activeModal.close({ isSuccess: true, components: this.components.filter(x => x.isSelected === true) });
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
}
