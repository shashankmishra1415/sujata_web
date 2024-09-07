import { Component, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../_models/product.model';
import { CustomConfirmOptions, CustomModalField, CustomPromptOptions } from '../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../_services/custom-modal/custom-modal.service';
import { ProductService } from '../../_services/products/products.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  totalRecords = 10;
  rows = 100;
  Filter = {
    Name: '',
    CreatedDate: '',
    PageNumber: 1,
    PageSize: 100
  }
  Products: Product[] = [];
  constructor(private toastr: ToastrService, private customModalService: CustomModalService, private el: ElementRef, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.loadData();
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

  loadData() {
    this.productService.list(this.Filter, (data: Product[]) => {
      this.Products = data
    });
  }

  item_delete_click(product: Product) {
    var options: CustomConfirmOptions = new CustomConfirmOptions();
    options.dialogSize = 'sm';
    options.icon = 'warning';
    options.title = "";
    options.message = "Are you sure you want to delete this?"
    options.OkButtonText = "Yes, Delete";
    options.CancelButtonText = "No, Cancel";

    options.OkCallback = () => {


      this.productService.delete(product.id,
        // successCallback
        () => {
          this.toastr.success('Item successfully deleted', 'Product');
          this.loadData();
        },
        // errorCallback
        (error: any) => {
          if (error.status === 404) {
            this.toastr.error('Item not found', 'Employment Category');
          }
          else {
            console.log('Error in deleting product: ', error);
          }
        }
      )
    }
    this.customModalService.confirm(options);
  }

  item_clone_click(product: Product) {
    var options: CustomPromptOptions = new CustomPromptOptions();
    options.isKeyboardEvents = true;
    options.dialogSize = 'sm';
    options.title = "";
    options.DataFields = [
      {
        title: 'Product Name',
        type: 'text',
        value: '',
        validations: ['required', 'trimOnChange'],
        colClass: 'col-md-12'
      }
    ]
    options.OkButtonText = "Submit";
    options.CancelButtonText = "Cancel";

    options.OkCallback = (DataFields: CustomModalField[], closeModal: Function) => {
      closeModal();
      this.productService.clone(product.id, DataFields[0].value.toString(),
        // successCallback
        () => {
          this.toastr.success('Item successfully cloned', 'Product');
          this.loadData();
        }
      );
    }
    this.customModalService.prompt(options);
  }

  filter_click() {
    this.loadData();
  }

  clear_click() {
    this.Filter.Name = '';
    this.Filter.CreatedDate = '';
    this.loadData();
  }
}
