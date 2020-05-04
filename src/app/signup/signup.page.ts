import { Component, OnInit } from '@angular/core';

import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ModalController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  loadingIndicator: any;
  loading = false;

  defaultDate = '1987-06-30';

  constructor(private userService: UserService,
              private authService: AuthService,
              private navCtrl: NavController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      telefono: new FormControl(null, [Validators.required]),
      escuela: new FormControl(null, [Validators.required]),
      genero: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  async onSubmit(): Promise<void> {
    await this.presentLoading('Creando cuenta...');

    if (this.signupForm.valid) {
      const email = this.signupForm.controls.email.value;
      const password = this.signupForm.controls.password.value;
      const username = this.signupForm.controls.username.value;
      const name = this.signupForm.controls.name.value;
      const telefono = this.signupForm.controls.telefono.value;
      const genero = this.signupForm.controls.genero.value;
      const escuela = this.signupForm.controls.escuela.value;
      const fecha = this.signupForm.controls.fecha.value;

      try {
        await this.userService.usernameExists(username);
        const credentials = await this.authService.signup(email, password);

        const user: User = {
          id: credentials.user.uid,
          username,
          email,
          name,
          telefono,
          escuela,
          genero,
          fecha
        };

        await this.userService.createUser(user);
        await this.authService.logout();
        this.dismissLoading();
        this.presentAlertConfirm('Bienvenido!', 'Tu cuenta ya se creo.');
      } catch (error) {
        this.dismissLoading();
        this.presentAlert('Algo salio mal', error.message);
      }

    } else {
      this.dismissLoading();

      this.presentAlert('Algo salio mal', 'Por favor llene todos los campos correctamente.');
    }
  }

  goToLogin(): void {
    this.navCtrl.navigateBack(['/login']);
  }

  getDate(e) {
    const date = new Date(e.target.value).toISOString().substring(0, 10);
    this.signupForm.get('fecha').setValue(date, {
       onlyself: true
    });
 }

  async presentLoading(body: string) {
    this.loadingIndicator = await this.loadingCtrl.create({
      message: body
    });
    this.loading = true;
    await this.loadingIndicator.present();
  }

  async dismissLoading() {
    this.loading = false;
    await this.loadingIndicator.dismiss();
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Listo!']
    });

    await alert.present();
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Listo',
          handler: () => {
            this.navCtrl.navigateRoot(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }

}
