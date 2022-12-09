import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title =" SOCIALRAPTOR";

  menuVariable: boolean = false;
  constructor() { }

  ngOnInit(): void {
    
  }

  
  openMenu(){
    console.log("open menu marche")
    this.menuVariable=true;
  }
}
