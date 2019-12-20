import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';

@Component({
  selector: 'app-ver-consultorio-ocupado',
  templateUrl: './ver-consultorio-ocupado.component.html',
  styleUrls: ['./ver-consultorio-ocupado.component.css']
})
export class VerConsultorioOcupadoComponent implements OnInit {

  consultorios = [];
  hayOcupados = false;
  consultoriosOcupados = [];
  consultoriosProximos = [];
  dataSource;
  dataSourceProximos;
  displayedColumns: string[] = ['Cliente', 'Especialidad', 'Especialista', 'Fecha', 'Sala'];

  constructor(private dbService:CloudFirestoreService,) { }

  ngOnInit() {
    this.cargarConsultorios();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  chequearProximo() {
    this.consultoriosProximos = [];
    this.consultorios.forEach(consultorio => {
      if((new Date().toISOString())<consultorio.start && consultorio.estado != "cancelado") {
        if(this.consultoriosProximos.length<1)
        this.consultoriosProximos.push(consultorio);
      }
    });

    let consultoriosProximosTodos = [];

    this.consultorios.forEach(consultorio => {
      if((new Date().toISOString())<consultorio.start && consultorio.estado != "cancelado") {
        consultoriosProximosTodos.push(consultorio);
      }
    });

    for(let i=1; i<consultoriosProximosTodos.length;i++) {
      if(consultoriosProximosTodos[i].start == this.consultoriosProximos[0].start && consultoriosProximosTodos[i].estado != "cancelado")
      this.consultoriosProximos.push(consultoriosProximosTodos[i]);
    }

    //console.log(this.consultoriosProximos);

    this.dataSourceProximos = new MatTableDataSource(this.consultoriosProximos);
  }

  chequearQueEstenOcupados() {
    this.consultoriosOcupados = [];
    this.consultorios.forEach(consultorio => {
      if( ((new Date().toISOString()) >= consultorio.start) && ((new Date().toISOString()) <= consultorio.end) ) {
        this.hayOcupados = true;
        this.consultoriosOcupados.push(consultorio);
      }
    });

    this.dataSource = new MatTableDataSource(this.consultoriosOcupados);
  }

  private async cargarConsultorios() {

    await this.dbService.traerTurnos().subscribe(async(tur: any) =>{
      this.consultorios = [];
      tur.forEach(t => {  
          this.consultorios.push(t);
      });

      this.chequearQueEstenOcupados();
      this.chequearProximo();
    });
  }

}
