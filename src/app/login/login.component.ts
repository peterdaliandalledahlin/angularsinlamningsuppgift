import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private cookieService: CookieService) { }

  loginForm: FormGroup;
  isSubmitted: boolean = false;

  ngOnInit() {
    if(this.cookieService.check('isLoggedIn'))
    {
      this.router.navigateByUrl('/')
    }
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get formControls() { return this.loginForm.controls }

  login() {
    
    this.isSubmitted = true;

    if(this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe((res) => {
      
      localStorage.setItem("ACCESS_TOKEN", res["token"]);
      localStorage.setItem("USER_ID", res["id"]);
      localStorage.setItem("USER_EMAIL", res["email"]);
      localStorage.setItem("USER_FIRSTNAME", res["firstname"]);
      localStorage.setItem("USER_LASTNAME", res["lastname"]);

      if(res["success"]) {
        this.cookieService.set('isLoggedIn', 'true', 7)
        this.router.navigateByUrl('/profile');
      }

    })

  }

}
