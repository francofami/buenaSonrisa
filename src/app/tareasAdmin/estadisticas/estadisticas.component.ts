import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import * as moment from 'moment';

declare var google;

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  chartIngresoEmpleados;
  chartTurnosPorEspecialidad;
  chartTurnosPorFecha;
  chartTurnosPorEspecialidadF;
  chartTurnosPorEspecialidadC;
  chartTurnosSegunTipoUsuario;

  nombresEspecialistas = [];
  especialistas = [];
  turnos = [];
  comentarios = [];
  comentariosPeores = [];
  comentariosMejores = [];
  turnosPorCliente = [];
  turnosPorRecepcionista = [];

  dataChartIngresoEmpleados = [];
  dataChartTurnosPorEspecialidad = [];
  dataChartTurnosPorFecha = []
  

  totalOrtodoncia = 0 ;
  totalEndodoncia = 0;
  totalRadiologia = 0;

  totalOrtodonciaF = 0 ;
  totalEndodonciaF = 0;
  totalRadiologiaF = 0;

  totalOrtodonciaC = 0 ;
  totalEndodonciaC = 0;
  totalRadiologiaC = 0;

  totalTurnosCliente = 0;
  totalTurnosRecep = 0;

  fechaDesde;
  fechaHasta;
  cantTurnosPorFecha = 0;
  sumaTurnosPorFecha = 0;
  turnosPorFecha = [];

  cantidadDiasEntreFechas = 0;
  cantidadDiasSinTurnos = 0;

  constructor(private dbService: CloudFirestoreService, private router: Router) {

   }

  ngOnInit() {
    this.chartIngresoEmpleados = {title:"Ingreso empleados:", type: "Timeline", data: ""}
    

    this.chartTurnosPorEspecialidad = {title: "Turnos por especialidad", type: "ColumnChart", data: ""}
    this.chartTurnosPorEspecialidadF = {title: "Turnos por especialidad", type: "ColumnChart", data: ""}
    this.chartTurnosPorEspecialidadC = {title: "Turnos por especialidad", type: "ColumnChart", data: ""}
    this.chartTurnosSegunTipoUsuario = {type: "PieChart", data: ""}
    this.chartTurnosPorFecha = {title:"Ingreso empleados:", type: "Timeline", data: ""}

    //this.chartTurnosPorEspecialidad = {title:"Turnos por especialidad:", type: "ColumnChart", data: ""}
    this.cargarIngresos();
    this.cargarEspecialistas();
    this.cargarTurnos();
    this.cargarTurnosFecha()
    this.cargarComentarios();
    this.cargarTurnosPorQuienLoHizo();
  }

  async cargarTurnosPorQuienLoHizo() {
    await this.dbService.traerTurnos().subscribe(async(ingreso) => {   
      ingreso.forEach(i => {
        let iAny:any=i;
        if(iAny.usuarioQueHizoTurno == 'cliente')
        this.turnosPorCliente.push(i);      
        if  (iAny.usuarioQueHizoTurno == 'recepcionista')
        this.turnosPorRecepcionista.push(i);      
      });

      this.calcularCantTurnoCliente();
      this.calcularCantTurnoRecep();

      this.chartTurnosSegunTipoUsuario = {type: "PieChart", data: [
        ['Recepcionista', this.totalTurnosRecep], ['Cliente', this.totalTurnosCliente]
      ]}

    });
  }

  async cargarComentarios() {
    await this.dbService.traerEncuestas().subscribe(async(ingreso) => {   
      ingreso.forEach(i => {
        let coment:any = i;
        if(coment.puntajeClinica <= 5 && coment.puntajeEspecialista <= 5) {
          if(this.comentariosPeores.length<=5)
          this.comentariosPeores.push(i);     
        }
        if(coment.puntajeClinica >5 && coment.puntajeEspecialista >5) {
          if(this.comentariosMejores.length<=5)
          this.comentariosMejores.push(i);
        }
           
      });



    });
  }

  async cargarTurnosFecha() {
    await this.dbService.traerTurnos().subscribe(async(ingreso) => {   
      ingreso.forEach(i => {
        this.turnosPorFecha.push(i);        
      });
    }); 
  }

  calcularCantTurnosFecha() {    

    this.cantTurnosPorFecha = 0;
    this.sumaTurnosPorFecha = 0;

    this.turnosPorFecha.forEach(turno => {
        let tAny: any = turno;

        if(new Date(tAny.start) >= new Date(this.fechaDesde) &&  new Date(tAny.end) <= new Date(this.fechaHasta)) {
          this.sumaTurnosPorFecha += 1;
        }


    });

    this.cantTurnosPorFecha = this.sumaTurnosPorFecha;

    let fecha1 = moment(this.fechaDesde);
    let fecha2 = moment(this.fechaHasta);

    this.cantidadDiasEntreFechas = fecha2.diff(fecha1, 'days');

    

    this.cantidadDiasSinTurnos = this.cantidadDiasEntreFechas - this.cantTurnosPorFecha;
  }

  calcularCantTurnoCliente() {
    this.turnosPorCliente.forEach(t => {
      this.totalTurnosCliente +=1;
    })
  }

  calcularCantTurnoRecep() {
    this.turnosPorRecepcionista.forEach(t => {
      this.totalTurnosRecep +=1;
    })
  }

  calcularCantTurnosF() {
    this.turnos.forEach(encuesta => {
      if(encuesta.especialidad == "Radiología" && encuesta.estado == "finalizado") {
       this.totalRadiologiaF += 1;
      } else if(encuesta.especialidad == "Ortodoncia" && encuesta.estado == "finalizado") {
       this.totalOrtodonciaF += 1;
      } else if(encuesta.especialidad == "Endodoncia" && encuesta.estado == "finalizado") {
       this.totalEndodonciaF += 1;
      } 
    });
   }


   calcularCantTurnosC() {
    this.turnos.forEach(encuesta => {
      if(encuesta.especialidad == "Radiología" && encuesta.estado == "cancelado") {
       this.totalRadiologiaC += 1;
      } else if(encuesta.especialidad == "Ortodoncia" && encuesta.estado == "cancelado") {
       this.totalOrtodonciaC += 1;
      } else if(encuesta.especialidad == "Endodoncia" && encuesta.estado == "cancelado") {
       this.totalEndodonciaC += 1;
      } 
    });
   }

   calcularCantTurnos() {
    this.turnos.forEach(encuesta => {
      if(encuesta.especialidad == "Radiología") {
       this.totalRadiologia += 1;
      } else if(encuesta.especialidad == "Ortodoncia" ) {
       this.totalOrtodoncia += 1;
      } else if(encuesta.especialidad == "Endodoncia" ) {
       this.totalEndodoncia += 1;
      } 
    });
   }

  

  async cargarEspecialistas() {
    await this.dbService.traerEspecialistas().subscribe(async(ingreso) => {   
      ingreso.forEach(i => {
        let iAny:any = i;
        this.nombresEspecialistas.push(iAny.nombre + ' ' + iAny.apellido);
        this.especialistas.push({nombre: iAny.nombre, apellido: iAny.apellido, especialidad:iAny.especialidad, cantidadTurnos: 0});        
      });
    }); 
  }

  async cargarIngresos() {
      await this.dbService.traerIngresos().subscribe(async(ingreso) => {   
        ingreso.forEach(i => {
         let iAny: any = i;
          //console.log(iAny.fechaIngreso.toDate());
          this.dataChartIngresoEmpleados.push([iAny.empleado.nombre+' '+iAny.empleado.apellido, iAny.fechaIngreso.toDate(), iAny.fechaIngreso.toDate()]);
        });
        
        //console.log(this.dataChartIngresoEmpleados);
        this.chartIngresoEmpleados = {title:"Ingreso empleados:", type: "Timeline", data: this.dataChartIngresoEmpleados }

      }); 
  }

  async cargarTurnos() {
    await this.dbService.traerTurnos().subscribe(async(turno) => {

      turno.forEach(t => {

        let tAny:any = t;

        this.turnos.push(t);
      });

      this.calcularCantTurnos();
      this.calcularCantTurnosF();
      this.calcularCantTurnosC();

      this.chartTurnosPorEspecialidad = {title: "Turnos por especialidad", type: "ColumnChart", data: [
        ['Endodoncia', this.totalEndodoncia],
        ['Ortodoncia', this.totalOrtodoncia],
        ['Radiología', this.totalRadiologia],
      ], columnNames: ['Especialidad', 'Cantidad']}
 

    this.chartTurnosPorEspecialidadF = {title: "Turnos realizados por especialidad", type: "ColumnChart", data: [
      ['Endodoncia', this.totalEndodonciaF],
      ['Ortodoncia', this.totalOrtodonciaF],
      ['Radiología', this.totalRadiologiaF],
    ], columnNames: ['Especialidad', 'Cantidad']}


  this.chartTurnosPorEspecialidadC = {title: "Turnos cancelados por especialidad", type: "ColumnChart", data: [
    ['Endodoncia', this.totalEndodonciaC],
    ['Ortodoncia', this.totalOrtodonciaC],
    ['Radiología', this.totalRadiologiaC],
  ], columnNames: ['Especialidad', 'Cantidad']}
});
  }





}
