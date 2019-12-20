import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material';
import { VerTurnosEspecialistaComponent } from '../ver-turnos-especialista/ver-turnos-especialista.component';


@Component({
  selector: 'app-dialogo-especialista',
  templateUrl: './dialogo-especialista.component.html',
  styleUrls: ['./dialogo-especialista.component.css']
})
export class DialogoEspecialistaComponent implements OnInit {

  mensaje;

  constructor(private dialogRef: MatDialogRef<VerTurnosEspecialistaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  guardar(respuesta) {
    this.dialogRef.close({ data: {mensaje: this.mensaje, respuesta: respuesta} });
  }

}
