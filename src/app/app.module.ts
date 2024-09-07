import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { LayoutsModule } from './layouts/layouts.module';
import { MasterLayoutComponent } from './layouts/master-layout/master-layout.component';
import { ProductsModule } from './products/products.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { CustomAlertDialogComponent } from './_services/custom-modal/custom-alert-dialog/custom-alert-dialog.component';
import { CustomConfirmDialogComponent } from './_services/custom-modal/custom-confirm-dialog/custom-confirm-dialog.component';
import { CustomPromptDialogComponent } from './_services/custom-modal/custom-prompt-dialog/custom-prompt-dialog.component';
import { CustomPromptFileDialogComponent } from './_services/custom-modal/custom-prompt-file-dialog/custom-prompt-file-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomConfirmDialogComponent,
    CustomPromptDialogComponent,
    CustomAlertDialogComponent,
    CustomPromptFileDialogComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
