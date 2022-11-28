import {ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { TempAppUserService } from "../../../core/service/temp-app-user.service";
import { AuthenticationService } from "../../../core/service/authentication.service";

@Component({
  selector: 'app-swal-config-profile',
  templateUrl: './swal-config-profile.component.html',
  styleUrls: ['./swal-config-profile.component.scss']
})
export class SwalConfigProfileComponent {

  // region Attributes

  @Input() shouldCancelButtonDisabled: boolean = false;
  @ViewChild('swalConfigProfile') swalConfigProfile?: SwalComponent;

  pseudoCtrl: FormControl = new FormControl('', Validators.required);
  ageCtrl:  FormControl = new FormControl(null, Validators.required);
  descriptionCtrl: FormControl = new FormControl('', Validators.required);
  imgCtrl: FormControl = new FormControl('assets/default-img/rj.png');

  configProfilGroup: FormGroup = new FormGroup({
    pseudo: this.pseudoCtrl,
    age: this.ageCtrl,
    description: this.descriptionCtrl
  })

  // endregion

  // region Constructor

  constructor(private tempUserService: TempAppUserService,
              private auth: AuthenticationService,
              private cd: ChangeDetectorRef) { }

  // endregion

  displaySwal() {
    this.swalConfigProfile?.fire().then(r => {
      // when user click on valid button we send the update
      if(r.isConfirmed)
      {
        let upUser = this.auth.userInfo;
        if(upUser)
        {
          upUser.userName = this.pseudoCtrl.value;
          upUser.age = this.ageCtrl.value;
          upUser.description = this.descriptionCtrl.value;
          upUser.imgPath = this.imgCtrl.value;
          this.tempUserService.updateConnectedUser(upUser).then();
        }
      }
    });
  }

  /**
   * Hide the valid button while the user has not filled all required field
   */
  shouldDisabledSendButton(): boolean {
    return this.configProfilGroup.valid;
  }

  /**
   * Change the current image display by the picture (take or choose on directory)
   */
  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgCtrl.setValue(reader.result);
        this.cd.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }

}
