import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _apiurl: string = "http://localhost:3001/api";

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  public getUser(): Observable<User[]> {
    let userid = localStorage.getItem("USER_ID")
    let token = localStorage.getItem("ACCESS_TOKEN")
    return this.http.get<User[]>(`${this._apiurl}/users/${userid}`, {
      headers: {
        'Authorization': `Bearer ${token}`
        }
    });
  }

  public login(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/login`, userInfo)
  }

  public register(userInfo: User) {
    return this.http.post(`${this._apiurl}/users/register`, userInfo);
  }

  public update(userInfo: User) {
    let userid = localStorage.getItem("USER_ID")
    let token = localStorage.getItem("ACCESS_TOKEN")
    return this.http.put(`${this._apiurl}/users/${userid}`, userInfo, {
      headers: {
        'Authorization': `Bearer ${token}`
        }
    });
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    this.cookieService.deleteAll();
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_ID');
    localStorage.removeItem('USER_EMAIL');
  }


}//export class Authservice end

