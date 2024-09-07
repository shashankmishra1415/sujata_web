import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ExpenseHead } from '../../../_models/expense_head.model';
import { ExpenseHeadService } from '../../../_services/configuration/lookups/expense-head.service';
import { CustomConfirmOptions, CustomModalField, CustomPromptOptions } from '../../../_services/custom-modal/custom-modal.model';
import { CustomModalService } from '../../../_services/custom-modal/custom-modal.service';

@Component({
  selector: 'app-expense-heads',
  templateUrl: './expense-heads.component.html',
  styleUrls: ['./expense-heads.component.css']
})
export class ExpenseHeadsComponent {
  ExpenseHeads: ExpenseHead[] = [];

  constructor(private toastr: ToastrService, private customModalService: CustomModalService, private expenseHeadService: ExpenseHeadService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.expenseHeadService.list((data: ExpenseHead[]) => {
      this.ExpenseHeads = data
    });
  }

  item_remove_click(expHead: ExpenseHead, index: number) {
    if (expHead.id !== 0) {
      var options: CustomConfirmOptions = new CustomConfirmOptions();
      options.dialogSize = 'sm';
      options.icon = 'warning';
      options.title = "";
      options.message = "Are you sure you want to delete this?"
      options.OkButtonText = "Yes, Delete";
      options.CancelButtonText = "No, Cancel";

      options.OkCallback = () => {
        this.expenseHeadService.delete(expHead.id,
          // successCallback
          () => {
            this.toastr.success('Item successfully deleted', 'Expense Head');
            this.loadData();
          },
          // errorCallback
          (error: any) => {
            if (error.status === 404) {
              this.toastr.error('Item not found', 'Expense Head');
            }
            else {
              alert('test');
            }
          }
        );
      }
      this.customModalService.confirm(options);
    }
    else {
      this.ExpenseHeads.splice(index, 1);
    }
  }

  add_item_click() {
    var expenseHead: ExpenseHead = {
      id: 0,
      name: ''
    }
    this.ExpenseHeads.push(expenseHead);
  }

  item_changed(expenseHead: ExpenseHead) {
    expenseHead.name = expenseHead.name.trim();
    if (expenseHead.name === '') {
      return;
    }
    this.expenseHeadService.save(expenseHead,
      // successCallback
      () => {
        if (expenseHead.id === 0) {
          this.toastr.success('Item saved successfully', 'Expense Head');
        }
        else {
          this.toastr.success('Item updated successfully', 'Expense Head');
        }
        this.loadData();
      }
    )
  }
}
