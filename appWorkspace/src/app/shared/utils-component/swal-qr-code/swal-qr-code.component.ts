import { Component, Input, ViewChild } from '@angular/core';
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { AppUser } from "../../../core/models/appUser";

@Component({
  selector: 'app-swal-qr-code[userConnected]',
  templateUrl: './swal-qr-code.component.html'
})
export class SwalQrCodeComponent  {

  // region Attributes

  @Input() userConnected?: AppUser | null;
  @ViewChild('swalDisplayQRCode') swalDisplayQRCode!: SwalComponent;

  // endregion

  displaySwal()
  {
    this.swalDisplayQRCode.fire().then();
  }

}
