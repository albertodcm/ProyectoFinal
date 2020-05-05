import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  getUser(uid: string) {
    return this.afs.doc(`users/${uid}`).valueChanges();
  }

  getEditUser(uid: string) {
    return this.afs.doc(`users/${uid}`).snapshotChanges().pipe(
      map(doc => {
        const data = doc.payload.data() as any;
        const id = doc.payload.id;

        return {id, ...data} as User;
      })
    );
  }


  createUser(user: User) {
    return this.afs.doc(`users/${user.id}`).set(user);
  }

  updateUser(user: User): Promise<void> {
    return this.afs.doc(`users/${user.id}`).update(user);
  }


  async usernameExists(username: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.afs.doc(`users/${username}`).get().toPromise().then((doc) => doc.exists);

      if (user) {
        reject(new Error('Este usuario ya esta en uso.'));
      } else {
        resolve(true);
      }
    });
  }
}
