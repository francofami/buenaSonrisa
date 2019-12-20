import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as crypto from 'crypto-js'; 

declare var require: any


@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioGuard implements CanActivate {
  
  constructor( private router: Router){}

  usuarioActual;

  

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let CryptoJS = require("crypto-js");
      let ciphertext = localStorage.getItem("usuarioActual");
      let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
      this.usuarioActual = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (this.usuarioActual == 'admin' ||this.usuarioActual == 'cliente' || this.usuarioActual == 'recepcionista') {
        return true;
      }

      this.router.navigateByUrl('home');
    return false;

    //return this.login.isAuthenticated();
  }
}

