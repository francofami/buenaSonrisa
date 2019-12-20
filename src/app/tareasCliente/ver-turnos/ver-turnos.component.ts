import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import * as crypto from 'crypto-js'; 
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare var require: any


@Component({
  selector: 'app-ver-turnos',
  templateUrl: './ver-turnos.component.html',
  styleUrls: ['./ver-turnos.component.css']
})
export class VerTurnosComponent implements OnInit {

  turnos = [];
  turnosFinalizados = [];
  turnosCancelados = []

  tieneTurnos = false;
  tieneTurnosF = false;
  tieneTurnosC = false;

  dataSource;
  dataSourceTurnosFinalizados;
  dataSourceTurnosCancelados;
  displayedColumns: string[] = ['Especialidad', 'Especialista', 'Fecha', 'Sala'];

  constructor(private dbService:CloudFirestoreService,) { }

  ngOnInit() {
    this.cargarTurnos();
  }

  exportPdfProximos() {
    let doc = new jsPDF();
    doc.autoTable({html: '#tablaProximos'});
    doc.save('turnosProximos.pdf');
  }

  exportPdfFinalizados() {
    let doc = new jsPDF();
    doc.autoTable({html: '#tablaFinalizados'});
    doc.save('turnosFinalizados.pdf');
  }

  exportPdfCancelados() {
    let doc = new jsPDF();
    doc.autoTable({html: '#tablaCancelados'});
    doc.save('turnosCancelados.pdf');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterFin(filterValue: string) {
    this.dataSourceTurnosFinalizados.filter = filterValue.trim().toLowerCase();
  }

  applyFilterCan(filterValue: string) {
    this.dataSourceTurnosCancelados.filter = filterValue.trim().toLowerCase();
  }

  private async cargarTurnos() {
    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    let cliente = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    await this.dbService.traerTurnosPorCliente(cliente.email).subscribe(async(tur: any) =>{
      this.turnos = [];
      this.turnosFinalizados = [];
      this.turnosCancelados = [];
      tur.forEach(t => {
        if (t.estado=='pendiente') {
          this.tieneTurnos = true;
          this.turnos.push(t);
        } else if (t.estado=='finalizado') {
          this.tieneTurnosF = true;
          this.turnosFinalizados.push(t);
        } else if (t.estado == 'cancelado') {
          this.tieneTurnosC = true;
          this.turnosCancelados.push(t);
        }
        
      });

      this.dataSource = new MatTableDataSource(this.turnos);
      this.dataSourceTurnosFinalizados = new MatTableDataSource(this.turnosFinalizados);
      this.dataSourceTurnosCancelados = new MatTableDataSource(this.turnosCancelados);

    });
  }

}
