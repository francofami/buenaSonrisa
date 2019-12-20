import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map, endWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudFirestoreService {

  constructor(private dbFirestore:AngularFirestore, private router: Router) { }

  //Cambia atributo realizoEncuesta a true
  actualizarEncuestaTurno(fecha, especialista) {
    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("turnos").doc(fecha+especialista).update({
        hizoEncuesta: true,
      }).then(()=>{
        resolve();
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Cambia el estado de un turno
  actualizarEstadoTurno(turno, estado) {
    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("turnos").doc(turno).update({
        estado: estado,
      }).then(()=>{
        resolve();
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Crear usuario cliente
  cargarCliente(cliente) {
    return new Promise((resolve,rejected)=>{

      this.dbFirestore.collection("usuarios").doc(cliente.email).set({

        nombre: cliente.nombre,
        apellido: cliente.apellido,
        foto: cliente.foto,
        email: cliente.email,
        tipo: cliente.tipo, 

    }).then(()=>{
      resolve(cliente);
      this.router.navigate(['/home']);
    }).catch((error)=>{
      rejected(error);
    });
  })
  }

  //Carga fecha y datos de egreso de empleado del sistema
  cargarEgreso(empleado) {

    let fechaIngreso = new Date();
    return new Promise((resolve,rejected)=>{
    this.dbFirestore.collection("egresos").doc(fechaIngreso.toISOString()+'.'+empleado.email).set({
      fechaIngreso: fechaIngreso,
      empleado: empleado,
    }).then(()=>{
      resolve(empleado);
    }).catch((error)=>{
      rejected(error);
    });
    })
  }

  //Crear usuario especialista
  cargarEspecialista(cliente) {
    return new Promise((resolve,rejected)=>{

      this.dbFirestore.collection("usuarios").doc(cliente.email).set({

        nombre: cliente.nombre,
        apellido: cliente.apellido,
        foto: cliente.foto,
        especialidad: cliente.especialidad,
        sala: cliente.sala,
        email: cliente.email,
        tipo: cliente.tipo, 

    }).then(()=>{
      resolve(cliente);
      this.router.navigate(['/home']);
    }).catch((error)=>{
      rejected(error);
    });
  })
  }

  //Carga fecha y datos de ingreso de empleado al sistema
  cargarIngreso(empleado) {

    let fechaIngreso = new Date();
    return new Promise((resolve,rejected)=>{
    this.dbFirestore.collection("ingresos").doc(fechaIngreso.toISOString()+'.'+empleado.email).set({
      fechaIngreso: fechaIngreso,
      empleado: empleado,
    }).then(()=>{
      resolve(empleado);
    }).catch((error)=>{
      rejected(error);
    });
    })
  }

  //Crear usuario recepcionista
  cargarRecepcionista(cliente) {
    return new Promise((resolve,rejected)=>{

      this.dbFirestore.collection("usuarios").doc(cliente.email).set({

        nombre: cliente.nombre,
        apellido: cliente.apellido,
        foto: cliente.foto,
        email: cliente.email,
        tipo: cliente.tipo, 

    }).then(()=>{
      resolve(cliente);
      this.router.navigate(['/home']);
    }).catch((error)=>{
      rejected(error);
    });
  })
  }

  //Sube una encuesta a la base de datos
  cargarEncuesta(usuario, fecha, encuesta) {
    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("encuestas").doc(usuario.email+fecha).set({
        usuario: usuario.email,
        fecha: fecha,
        puntajeClinica: encuesta.puntajeClinica,
        puntajeEspecialista: encuesta.puntajeEspecialista,
        mensaje: encuesta.mensaje,
      }).then(()=>{
        resolve(usuario);
        
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Sube un nuevo turno a la base de datos
  cargarTurno(usuario, comienzo,fin, especialista, especialidad, sala, usuarioQueHizoTurno) {
    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("turnos").doc(comienzo+especialista).set({
        title: "Turno",
        especialista: especialista,
        cliente: usuario,
        start: comienzo,
        end: fin,
        especialidad: especialidad,
        sala: sala,
        estado: "pendiente",
        hizoEncuesta: false,
        usuarioQueHizoTurno: usuarioQueHizoTurno,

      }).then(()=>{
        resolve(usuario);
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Sube una reseña a la base de datos
  cargarReseña(comienzo, especialista, especialidad, cliente, mensaje) {
    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("resenas").doc(comienzo+especialista).set({

        start: comienzo,
        cliente: cliente,
        mensaje: mensaje,
        especialista: especialista,
        especialidad: especialidad,
      }).then(()=>{
        resolve();
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Cancelar turno de la base de datos (borrado lógico)
  eliminarTurno(fechaTurno) {

    return new Promise((resolve,reject) => {
      this.dbFirestore.collection("turnos").doc(fechaTurno).update({
        estado: "cancelado",
      }).then(()=>{
        resolve();
        //this.router.navigateByUrl('');
      }).catch((error)=>{
        reject(error);
      });
    })
  }

  //Obtiene todos los clientes de la base de datos
  traerClientes() {
    return this.dbFirestore.collection('usuarios', ref => ref.where('tipo', '==', 'cliente').orderBy('apellido')).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene cliente de la base de datos por email
  traerClientePorEmail(email) {
    return this.dbFirestore.collection('usuarios', ref => ref.where('email', '==', email)).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todas las encuestas de la base de datos
  traerEncuestas() {
    return this.dbFirestore.collection('encuestas').snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todos los especialistas
  traerEspecialistas() {
    return this.dbFirestore.collection('usuarios', ref => ref.where('tipo', '==', 'especialista')).snapshotChanges().pipe(map((clientes) => {
      return clientes.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todos los ingresos de la base de datos
  traerIngresos() {
    return this.dbFirestore.collection('ingresos').snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }


  //Obtiene reseñas por cliente
  traerResenasPorCliente(cliente) {
    return this.dbFirestore.collection('resenas', ref => ref.where('cliente.email', '==', cliente).orderBy('start', 'desc')).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todos los turnos de la base de datos por especialista
  traerTurnosPorEspecialista(especialista) {
    return this.dbFirestore.collection('turnos', ref => ref.where('especialista', '==', especialista)).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todos los turnos de la base de datos
  traerTurnos() {
    return this.dbFirestore.collection('turnos', ref => ref.orderBy('start', 'asc')).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

  //Obtiene todos los turnos de la base de datos por cliente (email)
  traerTurnosPorCliente(cliente) {
    return this.dbFirestore.collection('turnos', ref => ref.where('cliente.email', '==', cliente).orderBy('start')).snapshotChanges().pipe(map((turnos) => {
      return turnos.map((a) => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
  }

}
