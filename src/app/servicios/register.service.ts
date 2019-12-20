import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { AngularFireAuth } from '@angular/fire/auth';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private afsAuth: AngularFireAuth,
    private db: CloudFirestoreService,
    private router: Router) { }

    registrarUsuario(usuario, mail, pass) {
      this.afsAuth.auth.createUserWithEmailAndPassword(mail, pass)
        .then( userData => {
          console.log(userData);
          userData.user.updateProfile( {
            displayName: mail
          });
          
          if(usuario.tipo == 'especialista') {
            this.db.cargarEspecialista(usuario).catch((error)=>{
              console.log(error);
            });
          } else if(usuario.tipo == 'cliente') {
            this.db.cargarCliente(usuario).catch((error)=>{
              console.log(error);
            });
          } else if(usuario.tipo == 'recepcionista') {
            this.db.cargarRecepcionista(usuario).catch((error)=>{
              console.log(error);
            });
          }      
      }).catch(err => {
        alert(err.message);
        return err;
      });
    }

}
