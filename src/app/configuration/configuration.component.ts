import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditorDays } from '../_models/creditor-days.model';
import { CreditorDaysService } from '../_services/configuration/creditor-days.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent {
  creditorDays: number = 0;

  constructor(private toastr: ToastrService, private creditorDaysService: CreditorDaysService) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.creditorDaysService.get((data: CreditorDays) => {
      this.creditorDays = data.days
    });
  }

  creditorDays_save_Click() {
    this.creditorDaysService.save({ days: this.creditorDays }, () => {
      this.toastr.success('Creditor days saved successfully', 'Creditor Days');
    })
  }
}
