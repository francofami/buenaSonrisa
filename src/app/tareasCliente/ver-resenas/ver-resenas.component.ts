import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import * as crypto from 'crypto-js'; 

declare var require: any


@Component({
  selector: 'app-ver-resenas',
  templateUrl: './ver-resenas.component.html',
  styleUrls: ['./ver-resenas.component.css']
})
export class VerResenasComponent implements OnInit {

  tieneResenas=false;
  dataSource;
  resenas = [];
  displayedColumns: string[] = ['Especialidad', 'Especialista', 'Reseña', 'Fecha'];

  constructor(private dbService:CloudFirestoreService,) { }

  ngOnInit() {
    this.cargarResenas();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async cargarResenas() {
    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    let cliente = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    await this.dbService.traerResenasPorCliente(cliente.email).subscribe(async(tur: any) =>{
      this.resenas = [];
      tur.forEach(t => {
          this.tieneResenas = true;
          this.resenas.push(t);      
      });

      this.dataSource = new MatTableDataSource(this.resenas);
    });
  }

}
