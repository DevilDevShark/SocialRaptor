import {NgModule} from "@angular/core";
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";

export const components = [ UserProfileComponent];

@NgModule({
    declarations: [ ...components ],
    exports: [
        ...components
    ],
    imports: [CoreModule, SharedModule, CommonModule, MatButtonModule]
})
export class UserProfileModule {}