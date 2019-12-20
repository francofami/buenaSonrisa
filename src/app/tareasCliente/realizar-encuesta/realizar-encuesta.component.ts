import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import * as crypto from 'crypto-js'; 
import {coerceNumberProperty} from '@angular/cdk/coercion';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var require: any


@Component({
  selector: 'app-realizar-encuesta',
  templateUrl: './realizar-encuesta.component.html',
  styleUrls: ['./realizar-encuesta.component.css']
})
export class RealizarEncuestaComponent implements OnInit {


  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;
  value2= 0;

  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  cliente;
  mensaje;
  turnoActual;
  verEncuesta= false;
  verFechas = false;
  encuestaEnviada = false;
  turnosFinalizados = [];
  dataSourceTurnosFinalizados;
  displayedColumns: string[] = ['Especialidad', 'Especialista', 'Fecha', 'Sala', 'Encuesta'];

  constructor(public dialog: MatDialog, private dbService:CloudFirestoreService,) { }

  ngOnInit() {
    this.cargarTurnos(); 
  }

  applyFilterFin(filterValue: string) {
    this.dataSourceTurnosFinalizados.filter = filterValue.trim().toLowerCase();
  }

  private async cargarTurnos() {
    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    this.cliente = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    await this.dbService.traerTurnosPorCliente(this.cliente.email).subscribe(async(tur: any) =>{
      this.turnosFinalizados = [];
      
      tur.forEach(t => {
        if (t.estado=='finalizado' && t.hizoEncuesta == false) {
          this.verFechas = true;
          this.turnosFinalizados.push(t);
        }        
      });
      
      this.dataSourceTurnosFinalizados = new MatTableDataSource(this.turnosFinalizados);

    });
  }

  realizarEncuesta(turno) {
    this.verFechas = false;
    this.verEncuesta = true;

    this.turnoActual = turno;
  }

  enviarEncuesta() {

    let encuesta={
      puntajeClinica:this.value,
      puntajeEspecialista:this.value2,
      mensaje:this.mensaje,
    }

    this.dbService.actualizarEncuestaTurno(this.turnoActual.start, this.turnoActual.especialista);
    this.dbService.cargarEncuesta(this.cliente, this.turnoActual.start, encuesta);
    this.verEncuesta = false;
    this.encuestaEnviada = true;
    
  }

 

}

