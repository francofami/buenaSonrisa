import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CloudFirestoreService } from 'src/app/servicios/cloud-firestore.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-pedir-turno-recep',
  templateUrl: './pedir-turno-recep.component.html',
  styleUrls: ['./pedir-turno-recep.component.css']
})
export class PedirTurnoRecepComponent implements OnInit {


  clienteEstaSeleccionado = false;
  clienteSeleccionado;
  clientes = [];
  dataSource;
  displayedColumns: string[] = ['Apellido', 'Nombre', 'Mail', 'Seleccionar'];

  constructor(private dbService:CloudFirestoreService,) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private async cargarClientes() {
    await this.dbService.traerClientes().subscribe(async(cli: any) =>{
      this.clientes = [];
      
      cli.forEach(c => {
          this.clientes.push(c);
      });

      this.dataSource = new MatTableDataSource(this.clientes);
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  seleccionarCliente(cliente) {
    this.clienteSeleccionado = cliente;
    this.clienteEstaSeleccionado = true;   
  }

}
