import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MasterLayoutComponent } from "./master-layout/master-layout.component";

@NgModule({
  declarations: [
    MasterLayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule
  ],
  exports: [
    MasterLayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class LayoutsModule { }
