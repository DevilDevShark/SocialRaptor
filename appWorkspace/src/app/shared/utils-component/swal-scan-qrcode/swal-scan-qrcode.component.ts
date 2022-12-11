import { Component, ViewChild } from '@angular/core';
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

@Component({
  selector: 'app-swal-scan-qrcode',
  templateUrl: './swal-scan-qrcode.component.html',
  styleUrls: ['./swal-scan-qrcode.component.scss']
})
export class SwalScanQrcodeComponent {

  // region Attributes

  @ViewChild('swalScanner') swalScanner!: SwalComponent;

  // endregion

  displaySwal()
  {
    this.swalScanner.fire().then();
  }

}
