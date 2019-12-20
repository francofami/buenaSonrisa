import { Component, OnInit, ViewChild } from '@angular/core';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CloudFirestoreService } from '../../servicios/cloud-firestore.service';
import * as crypto from 'crypto-js'; 
import { Router } from '@angular/router';

declare var require: any

@Component({
  selector: 'app-cancelar-turno',
  templateUrl: './cancelar-turno.component.html',
  styleUrls: ['./cancelar-turno.component.css']
})
export class CancelarTurnoComponent implements OnInit {

  constructor(private router: Router,private dbService: CloudFirestoreService) {}

  ngOnInit() {
    //this.usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    let CryptoJS = require("crypto-js");
    let ciphertext = localStorage.getItem("usuarioActual");
    let bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'FKDFJFKLASDJFKASL5435$#"%$#"&/%&)!#$=%EGDFSHGKÑ%#)=&I#$)GFKDFSGOK%O=G03520521g0fdghfg0htqhthwrthgfsh01520yt15254265&"$%&');
    this.usuarioActual = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

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
        if(e.estado != 'cancelado') {
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

  handleDateClick(arg) {

    console.log(arg);
    
    if (confirm('¿'+'Cancelar turno: ' + arg.event.start + ' ?')) {      

      this.dbService.eliminarTurno(arg.event.start.toISOString()+arg.event.extendedProps.especialista);

      /*this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array    
        title: 'Turno',
        start: arg.date,
        end: finalDateStr,
      })*/
    }
  }

}
