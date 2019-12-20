import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CloudFirestoreService } from '../servicios/cloud-firestore.service';
import * as crypto from 'crypto-js'; 
import { Router } from '@angular/router';

declare var require: any


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent{

  @Input() clienteSeleccionadoPorRecepcionista: any;

  constructor(private router: Router,private dbService: CloudFirestoreService) {}

  ngOnInit() {
    //this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    if((JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).tipo == 'cliente')) {
      this.usuarioActual = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.usuarioQueHizoTurno = "cliente";
    } else {
      this.usuarioQueHizoTurno = "recepcionista";
      this.usuarioActual = this.clienteSeleccionadoPorRecepcionista;
    }
    

    this.cargarEspecialistas();
    //this.cargarFechas(especialista);
  }

  public async cargarFechas(especialista) {
    await this.dbService.traerTurnosPorEspecialista(especialista).subscribe(async(turno) => {
      this.fechasOcupadas = [];
      //this.fechasOcupadas.push({ title: 'Turno', start: new Date() });

      console.log(this.fechasOcupadas);
      
      turno.forEach(t => {
        let e: any = t;
        if(e.estado != 'cancelado' && e.estado != 'finalizado' && e.estado != 'ausente') {
          this.fechasOcupadas.push(t);
        }  
      });

      this.calendarEvents = this.fechasOcupadas;

    }); 
  }

  private async cargarEspecialistas() {
    await this.dbService.traerEspecialistas().subscribe(async(especialista) => {
      this.especialistas = [];
      
      especialista.forEach(e => {
        this.especialistas.push(e);
      });
    }); 
  }

  @ViewChild('calendar', {static:false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  especialistaSeleccionado = "";
  usuarioActual;
  fechasOcupadas = [];
  especialistas = [];
  usuarioQueHizoTurno;

  showNonCurrentDates = false;
  slotLabelInterval = "00:15:00"
  slotDuration = "00:15:00"
  allDaySlot = false;
  minTime = "08:00";
  maxTime = "19:00";
  hiddenDays = [0];
  locales = [esLocale];
  calendarVisible = true;
  calendarPlugins = [timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[];

  businessHours = [ 
    {
      daysOfWeek: [ 1, 2, 3, 4, 5 ],
      startTime: '08:00',
      endTime: '19:00'
    },
    {
      daysOfWeek: [6], 
      startTime: '08:00',
      endTime: '14:00'
    }
  ];

  slotLabelFormat = [
    {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    }
  ]


  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  chequearFechaRepetida(arg): boolean {
    let retorno = true;

    this.fechasOcupadas.forEach(fecha => {
      if(fecha.start == new Date(arg.date).toISOString()) {
        retorno = false;
      }
    });

    return retorno;
  }

  handleDateClick(arg) {

    if(this.chequearFechaRepetida(arg) == false) {
      alert("¡Fecha inválida!");
    } else

    if ((new Date(arg.date).getDay() == 6 ) && (new Date(arg.date).getHours() >= 14)) {
      alert("¡Fecha inválida!");
    } else  if( new Date(arg.date).toISOString() >=  new Date().toISOString()  ) {

    
    if (confirm('¿'+'Reservar turno: ' + arg.dateStr + ' ?')) {
      console.log(arg.date);
      let tempDate = new Date(arg.date);
      let finalDate = new Date(tempDate.setMinutes(tempDate.getMinutes()+15));
      let finalDateStr = finalDate.toISOString();

      let especialistaYEspecialidad = this.especialistaSeleccionado.split('.');

      this.dbService.cargarTurno(this.usuarioActual, (new Date(arg.date)).toISOString(), finalDateStr, especialistaYEspecialidad[0], especialistaYEspecialidad[1], especialistaYEspecialidad[2], this.usuarioQueHizoTurno);

      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array    
        title: 'Turno',
        start: arg.date,
        end: finalDateStr,
      })
    }

    } else {
      alert("¡Fecha inválida!");
    }

    
  }




}
