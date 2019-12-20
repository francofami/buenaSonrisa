import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import {MatSidenav} from '@angular/material';
import 'hammerjs';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { LoginService } from 'src/app/servicios/login.service';
import { LeerDatosUsuariosService } from 'src/app/servicios/leer-datos-usuarios.service';
import * as crypto from 'crypto-js'; 
import { NgxSpinnerService } from "ngx-spinner";

declare var require: any


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav, {static: true}) sidenav: MatSidenav;
  
  usuarioActual: any;
  events: string[] = [];
  opened: boolean = true;
  nombre: string;
  tipo;
  foto;

  pedirTurno = false;
  verMisTurnos = false;
  realizarEncuesta = false;
  pedirTurnoRecep = false;
  cancelarTurnoRecep = false;
  verConsultoriosOcupados = false;
  verTurnosEspecialista = false;
  verResenas = false;
  verAltas = false;
  verEstadisticas = false;
  tipoAlta = "";

  constructor(
    private spinner: NgxSpinnerService,
    private leerDatosService: LeerDatosUsuariosService,
    private loginService: LoginService,
    private dbService:CloudFirestoreService,
    ) { }

  ngOnInit() {

     /** spinner starts on init */
     this.spinner.show();
 
     setTimeout(() => {
       /** spinner ends after 5 seconds */
       this.spinner.hide();
     }, 3000);
   
    //this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    this.usuarioActual = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    this.tipo = this.usuarioActual.tipo;
    console.log(this.usuarioActual);

    switch(this.tipo) {
      case 'admin':
        this.verEstadisticas = true;
      break;

      case 'cliente':
        this.pedirTurno = true;
      break;

      case 'especialista':
        this.verTurnosEspecialista = true;
      break;

      case 'recepcionista':
        this.verConsultoriosOcupados = true;
      break;
    }
  }

  logOut() {
    this.loginService.logout();
  }

  cargarPagina(opcion) {
    switch(opcion) {
      case 'pedirTurno':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.verTurnosEspecialista = false;
        this.verMisTurnos = false;
        this.realizarEncuesta = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.pedirTurno = true;
      break;
      case 'verMisTurnos':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.verTurnosEspecialista = false;
        this.pedirTurno = false;
        this.realizarEncuesta = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verMisTurnos = true;
      break;
      case 'realizarEncuesta':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.realizarEncuesta = true;
      break;
      case 'pedirTurnoRecep':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;   
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.pedirTurnoRecep = true;
      break;
      case 'cancelarTurnoRecep':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.verTurnosEspecialista = false;
        this.verConsultoriosOcupados = false;
        this.cancelarTurnoRecep = true;
      break;
      case 'verConsultoriosOcupados':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verTurnosEspecialista = false;
        this.verConsultoriosOcupados = true;
      break;
      case 'verTurnosEspecialista':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = true;
      break;
      case 'verResenas':
        this.verEstadisticas = false;
        this.verAltas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.verResenas = true;
      break;
      case 'altaCliente':
        this.verEstadisticas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.verResenas = false;
        this.verAltas = true;
        this.tipoAlta = "cliente";
      break;
      case 'altaRecepcionista':
        this.verEstadisticas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.verResenas = false;
        this.verAltas = true;
        this.tipoAlta = "recepcionista";
      break;
      case 'altaEspecialista':
        this.verEstadisticas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.verResenas = false;
        this.verAltas = true;
        this.tipoAlta = "especialista";
      break;
      case 'verEstadisticas':
        this.verEstadisticas = false;
        this.verResenas = false;
        this.realizarEncuesta = false;
        this.verMisTurnos = false;
        this.pedirTurno = false;
        this.pedirTurnoRecep = false;
        this.cancelarTurnoRecep = false;
        this.verConsultoriosOcupados = false;
        this.verTurnosEspecialista = false;
        this.verResenas = false;
        this.verAltas = false;
        this.verEstadisticas = true;
      break;
    }
  }

}
