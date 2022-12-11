import { Component, Input } from '@angular/core';
import * as f from "firebase/firestore";
import Timestamp = f.Timestamp;

@Component({
  selector: 'app-item-in-list',
  templateUrl: './generic-display-item-in-list.component.html',
  styleUrls: ['./generic-display-item-in-list.component.scss']
})
export class GenericDisplayItemInListComponent {

  @Input() userName: string | undefined = '';
  @Input() createdDate: Timestamp = f.Timestamp.now();
  @Input() text: string | undefined = '';
  @Input() imgProfile: string | undefined = 'assets/default-img/rj.png';

  /**
   * Get the number of days before today
   */
  getNbDayBefore(): string {

    let currentDate = new Date(); // today's date
    let creationDate = this.createdDate?.toDate().getTime();

    let deltaInMinutes = Math.round((currentDate.getTime() -  creationDate) /  60 / 1000);
    let deltaInHours =  Math.round(deltaInMinutes / 60);
    let deltaInDays =  Math.round(deltaInHours / 24);

    return deltaInDays > 0 ? deltaInDays + 'j':
        deltaInHours < 25 && deltaInHours > 0 ? deltaInHours + 'h':
            deltaInMinutes > 0 && deltaInMinutes < 60 ? deltaInMinutes + "min":
                '0s';
  }

}
