import { NgModule } from "@angular/core";
import { InputFieldComponent } from "./utils-component/input-field/input-field.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { BackButtonDirective } from "./directives/backButton.directive";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SwalConfigProfileComponent } from "./utils-component/swal-config-profile/swal-config-profile.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { ImgProfileContainerComponent } from './utils-component/img-profile-container/img-profile-container.component';
import { GenericDisplayItemInListComponent } from './utils-component/generic-display-item-in-list/generic-display-item-in-list.component';
import { SwalQrCodeComponent } from './utils-component/swal-qr-code/swal-qr-code.component';
import { QRCodeModule } from "angularx-qrcode";

const matModules= [ MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatTooltipModule, MatDividerModule, ReactiveFormsModule ];

const directives = [ BackButtonDirective ];

const components= [ ImgProfileContainerComponent, InputFieldComponent, GenericDisplayItemInListComponent,
  SwalConfigProfileComponent, SwalQrCodeComponent ];

@NgModule({
  declarations: [...components, ...directives, SwalQrCodeComponent ],
  imports: [...matModules, CommonModule, SweetAlert2Module.forRoot(), QRCodeModule ],
  exports: [...matModules, ...components, ...directives ]
})

export class SharedModule {}
