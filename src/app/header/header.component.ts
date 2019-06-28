import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private router: Router, private cookieService: CookieService, private authService: AuthService) { }

  isLoggedIn: boolean = this.cookieService.check("isLoggedIn");

  public user = {};
  
  ngOnInit() {

    let firstname = localStorage.getItem("USER_FIRSTNAME")
    let lastname = localStorage.getItem("USER_LASTNAME")

    this.user = firstname + " " + lastname
  
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.cookieService.deleteAll();
    this.router.navigateByUrl("/");
    localStorage.clear()
  };

}
