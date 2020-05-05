import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: User;
  userForm: FormGroup;
  defaultDate = '1987-06-30';
  editar = false;

  constructor(public modalCtrl: ModalController,
              private authService: AuthService,
              private navCtrl: NavController,
              private navParams: NavParams,
              private userService: UserService) { }

  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
    this.initForm();
    const uid = this.navParams.get('userid');
    if (uid) {
      this.getUser(uid);
    } else {

    }
  }

  initForm(): void {
    this.userForm = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      telefono: new FormControl(null, [Validators.required]),
      escuela: new FormControl(null, [Validators.required]),
      genero: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required])
    });
  }

  getUser(uid: string) {
    this.userService.getEditUser(uid).subscribe((user: User) => {
      this.user = user;
      this.userForm.patchValue(user);
    })
  }

  updateUser(): void {
    if (this.userForm.enabled && this.userForm.valid) {
      const updatedUser: User = {
        ...this.userForm.value,
        id: this.user.id
      };

      this.userService.updateUser(updatedUser).then(() => {
      }).catch((error) => {
        console.log('error');
      });
    } else {
      console.log('error');
    }
    this.editar = false;
  }

  getDate(e) {
    const date = new Date(e.target.value).toISOString().substring(0, 10);
    this.userForm.get('fecha').setValue(date, {
       onlyself: true
    });
 }

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }

  cerrarSesion() {
    this.authService.logout();
    this.navCtrl.navigateRoot(['tabs/home']);
    this.dismiss();
  }


  getEditable() {
    this.editar = true;
  }


}
