import { NgModule } from "@angular/core";
import {InputFieldComponent} from "./utils-component/input-field/input-field.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {BackButtonDirective} from "./directives/backButton.directive";
import { NativeCameraComponent } from './utils-component/native-camera/native-camera.component';
import {CommonModule} from "@angular/common";

const matModules= [ MatCardModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDividerModule ];

const components= [ InputFieldComponent ];

@NgModule({
  declarations: [...components, BackButtonDirective, NativeCameraComponent],
    imports: [...matModules, CommonModule],
  exports: [...matModules, ...components, BackButtonDirective, NativeCameraComponent]
})

export class SharedModule {}
