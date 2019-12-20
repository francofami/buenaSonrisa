import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { LeerDatosUsuariosService } from 'src/app/servicios/leer-datos-usuarios.service';
import { Usuario } from 'src/app/clases/usuario';
import * as crypto from 'crypto-js'; 
import { RegisterService } from 'src/app/servicios/register.service';
import { AltasComponent } from 'src/app/tareasAdmin/altas/altas.component';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';


declare var require: any


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSpinner = false;
  respCaptcha: boolean = false;
  usuarioActual: any;
  nombre: string;
  email: string;
  password: string;
  //respCaptcha: boolean = false;
  registro = false;
  apellido;
  foto;
  repassword;

  envioForm = false;
  respuestaFire:any = "";

  constructor(
    private registService: RegisterService,
    private leerDatosService: LeerDatosUsuariosService,
    public afAuth: AngularFireAuth,
    public router: Router,
    private loginService: LoginService,
    private serviceFirestore: CloudFirestoreService,
    private subirFotoService: FirebaseStorageService,
    private storage: AngularFireStorage,
    ) { 
      
    }

  ngOnInit() {
  }

  toggleReg() {
    this.registro = !this.registro;
  }

  /*recibirCaptcha(respuesta: boolean) {
    this.respCaptcha = respuesta;
  }*/

  onLogin() {
    if(this.respCaptcha == true) {
      this.loginService.loginEmail(this.email, this.password)
    .then ( (res) => {
      this.leerDatosService.leerDatos()
    .then(data => {
      this.usuarioActual = data;

      if(this.usuarioActual.nombre != undefined) {
        this.nombre = this.usuarioActual.nombre;
      } else {
        this.nombre = "";
      }

      if(this.usuarioActual.tipo == 'especialista' || this.usuarioActual.tipo == 'recepcionista') {
        this.serviceFirestore.cargarIngreso(this.usuarioActual);
      }

      let CryptoJS = require("crypto-js");
      
      let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(this.usuarioActual), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&')
      var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      localStorage.setItem('usuarioActual', ciphertext);


      this.router.navigate(['/home']);
    })
    .catch(err => {
      console.log(err.message);
    });
    } ).catch(err => {
     console.log(err.message); });
    } else {
      alert("Complete el captcha");
    }

  }

  onUpload(e) {
    const file = e.target.files[0];  
    this.subirFotoService.subirFoto(file).then(fotoSubida=>{
      this.foto = fotoSubida;
    });

    
  }

  recibirCaptcha(respuesta: boolean) {
    this.respCaptcha = respuesta;
  }

  cargarCliente() {

    if(this.respCaptcha == true) {


      if(this.password != this.repassword) {
        alert("Las contraseñas no coinciden!");
      }else
      if(this.nombre.length<1 || this.apellido.length<1 || this.email.length<1 || this.password.length<1) {
        alert("Rellene todos los campos!");
      } else {


      
      if(!this.foto) {
        this.foto = "./assets/0d36e7a476b06333d9fe9960572b66b9.jpg";
      }
  
      let cliente={
        nombre: this.nombre,
        apellido: this.apellido,
        foto:this.foto,
        email: this.email,
        tipo: 'cliente',    
      }
      
      this.envioForm = true;
      this.respuestaFire = this.registService.registrarUsuario(cliente, this.email, this.password);
      console.log(this.respuestaFire);
      }
    } else {
      alert("Complete el captcha");
    }

    
  }

}
