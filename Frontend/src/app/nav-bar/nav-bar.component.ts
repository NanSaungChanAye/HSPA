import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  loggedinUser:string;
  constructor() { }

  ngOnInit() {
  }

  loggedin()
  {
    this.loggedinUser=localStorage.getItem('token');//if the user is loggedin
    return this.loggedinUser;
    //return localStorage.getItem('token');
  }

  onLogout()
  {
    return localStorage.removeItem('token');
  }
}
