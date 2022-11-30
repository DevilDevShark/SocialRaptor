import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-img-profile-container',
  templateUrl: './img-profile-container.component.html',
  styleUrls: ['./img-profile-container.component.scss']
})
export class ImgProfileContainerComponent {

  @Input() imgSrc: string | undefined = 'assets/default-img/rj.png';

}
