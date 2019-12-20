import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { isRejected } from 'q';



declare var require: any

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  jwtHelper = new JwtHelperService();

  constructor(private afsAuth: AngularFireAuth, private router: Router) { }

  /*loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }*/

  loginEmail(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass).then(user => {
        user.user.getIdToken().then(function (token) {
          localStorage.setItem('token', token);
        });
        resolve(user);
      }).catch(err => {
        alert(err.message);
      });
    });
  }

  isAuthenticated() {
    /*let token = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);*/

    let token = localStorage.getItem('token');
    let tokenDec = this.jwtHelper.isTokenExpired(token);
    return tokenDec;
  }

  getTokenExpirationDate(): Date {
    let token = localStorage.getItem('token');
    const decoded = this.jwtHelper.decodeToken(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    let token = localStorage.getItem('token');
    if(!token) token = localStorage.getItem('token');
    if(!token) return true;

    const date = this.getTokenExpirationDate();
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  logout() {    
    localStorage.clear();
    this.router.navigateByUrl('login');
    return this.afsAuth.auth.signOut();
  }
}
