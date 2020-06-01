import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/models/empresa.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private afs: AngularFirestore) { }

  getEmpresa(orgId: string) {
    return this.afs.doc(`organizaciones/${orgId}`).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as any;
        const id = a.payload;

        return { id, ...data} as Empresa;
      })
    );
  }

  getEmpresas(): Observable<Empresa[]> {
    return this.afs.collection('organizaciones').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        return { id, ...data} as Empresa;
      }))
    );
  }

  searchEmpresa(name: string) {
    return this.afs.collection('organizaciones', ref => ref
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
