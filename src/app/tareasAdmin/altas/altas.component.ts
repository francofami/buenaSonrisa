import { Component, OnInit, Input } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebaseStorageService } from 'src/app/servicios/firebase-storage.service';
import { RegisterService } from 'src/app/servicios/register.service';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})
export class AltasComponent implements OnInit {

  

  @Input() tipo;

  nombre;
  apellido;
  email;
  password;
  repassword;
  foto;

  especialidad;
  sala;

  envioForm = false;
  respuestaFire:any = "";


  constructor(private registerService: RegisterService,public router: Router, private serviceFirestore:CloudFirestoreService, private subirFotoService: FirebaseStorageService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  onUpload(e) {
    const file = e.target.files[0];  
    this.subirFotoService.subirFoto(file).then(fotoSubida=>{
      this.foto = fotoSubida;
    });
  }

  cargarCliente() {

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
    
    if(this.password != this.repassword) {
      alert("Las contraseñas no coinciden!");
    }else
    if(this.nombre.length<1 || this.apellido.length<1 || this.email.length<1 || this.password.length<1) {
      alert("Rellene todos los campos!");
    } else if(this.password.length<6){
      alert("La contraseña debe superar los 6 dígitos.")
    } else {
      this.envioForm = true;
      this.respuestaFire = this.registerService.registrarUsuario(cliente, this.email, this.password);
    }
    
  }

  cargarEspecialista() {

    if(!this.foto) {
      this.foto = "./assets/0d36e7a476b06333d9fe9960572b66b9.jpg";
    }

    let especialista={
      nombre: this.nombre,
      apellido: this.apellido,
      especialidad: this.especialidad,
      sala: this.sala,
      foto:this.foto,
      email: this.email,
      tipo: 'especialista',    
    }

    if(this.password != this.repassword) {
      alert("Las contraseñas no coinciden!");
    }else
    if(this.nombre.length<1 || this.especialidad.length<1 || this.apellido.length<1 || this.email.length<1 || this.password.value.length<1) {
      alert("Rellene todos los campos!");
    } else if(this.password.length<6){
      alert("La contraseña debe superar los 6 dígitos.")
    }else {
      this.envioForm = true;
      this.respuestaFire = this.registerService.registrarUsuario(especialista, this.email, this.password);
    }
  }

  cargarRecepcionista() {

    if(!this.foto) {
      this.foto = "./assets/0d36e7a476b06333d9fe9960572b66b9.jpg";
    }

    let recepcionista={
      nombre: this.nombre,
      apellido: this.apellido,
      foto:this.foto,
      email: this.email,
      tipo: 'recepcionista',    
    }
    
    if(this.password != this.repassword) {
      alert("Las contraseñas no coinciden!");
    }else
    if(this.nombre.length<1 || this.apellido.length<1 || this.email.length<1 || this.password.length<1) {
      alert("Rellene todos los campos!");
    } else if(this.password.length<6){
      alert("La contraseña debe superar los 6 dígitos.")
    }else {
      this.envioForm = true;
      this.respuestaFire = this.registerService.registrarUsuario(recepcionista, this.email, this.password);
    }
    
  }



}
