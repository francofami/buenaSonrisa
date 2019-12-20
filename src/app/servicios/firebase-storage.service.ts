import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { async, resolve, reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class FirebaseStorageService {

  constructor(private storage: AngularFireStorage) { }

  public subirFoto(file) {
    const id = Math.random().toString(36).substring(2);
    const fileName = `fotosUsuarios/${id}`;
    var fotoURL = "";
    return new Promise((resolve, rejected)=>{
      const ref = this.storage.ref(fileName);
      ref.put(file).then(async()=>{
        this.storage.ref(fileName).getDownloadURL().subscribe(async(url)=>{
          resolve(url);
        })
      })
    })
  }
}
