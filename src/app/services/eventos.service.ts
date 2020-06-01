import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Evento } from 'src/models/evento.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private afs: AngularFirestore) { }

  getEvento(eventoId: string) {
    return this.afs.doc(`eventos/${eventoId}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const id = a.payload;
        return { id, ...data} as Evento;
      })
    );
  }

  getEventos(): Observable<Evento[]> {
    return this.afs.collection('eventos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        return { id, ...data } as Evento;
      }))
    );
  }

  searchEvento(name: string) {
    return this.afs.collection('eventos', ref => ref
      .where('nombre', '>=', name)
      .where('nombre', '<=', name + '\uf8ff')
      .limit(10)
      .orderBy('nombre'))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        return a.payload.doc.data();
      }))
    );
  }


}
