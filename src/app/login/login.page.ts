import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, ModalController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RecuperarPWDPage } from '../modals/recuperar-pwd/recuperar-pwd.page';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  passwordToggleICon = 'eye';

  loadingIndicator;
  loading = false;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController,
              private router: Router,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.initForm();

    const navigationId = this.router.getCurrentNavigation().id;

    if (navigationId === 1) {
      this.presentLoading('Cargando...');
      this.authService.user$.pipe(take(1)).subscribe((user) => {
        setTimeout(() => {
          this.dismissLoading();
        }, 200);
        if (user) {
          this.navCtrl.navigateRoot(['tabs']);
        }
      });
    }
  }

  initForm(): void {
    this.loginForm = new FormGroup ({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.minLength(6)])
    });
  }

  goToSignup(): void {
    this.navCtrl.navigateForward(['signup']);
  }

  login(): void {
    console.log('entre al log in');
    if (this.loginForm.valid) {
      console.log('entre al if');
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      console.log('entre al a la funcion');
      this.authService.login(email, password);
      this.navCtrl.navigateRoot(['tabs/home']);
      console.log('exito');
    } else {
      this.presentAlert();
    }
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Error!',
      message: 'Por favor llene de manera correcta todos los campos.',
      buttons: ['Okay']
    });
    await alert.present();
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
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

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }

  async resetPassword() {
    const modal = await this.modalCtrl.create({
      component: RecuperarPWDPage,
    });
    return await modal.present();
  }
}
