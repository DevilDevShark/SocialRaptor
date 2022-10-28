import {Component, Input, OnInit} from '@angular/core';
import {MatFormFieldAppearance} from "@angular/material/form-field";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {

  @Input() title: string = "";
  @Input() classForm: MatFormFieldAppearance = 'fill';
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';

  constructor() { }

  ngOnInit(): void {
  }

}
