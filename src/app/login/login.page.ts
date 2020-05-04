import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  showPassword = false;
  passwordToggleICon = 'eye';

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private alertCtrl: AlertController,
              public modalCtrl: ModalController) { }

  ngOnInit() {
    this.initForm();
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

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }
}
