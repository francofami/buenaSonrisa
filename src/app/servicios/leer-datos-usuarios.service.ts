import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class LeerDatosUsuariosService {

  user;

  constructor(private afsAuth: AngularFireAuth,
  private db: AngularFirestore,
  private router: Router) { }


      leerDatos() {
        return new Promise((resolve, reject) => {
          this.afsAuth.auth.onAuthStateChanged((user) => {
            if (!user) {
              reject('NO esta logueado');
              return;
            }

            //console.log(user);
            this.user = user;
            let email = user.email;
            localStorage.setItem("email", email);
            this.db.collection('usuarios').doc(email).get()
            .subscribe(data => {
              resolve(data.data());
            }, err => {
              reject(err);
            });
          });
        });


      }

}
