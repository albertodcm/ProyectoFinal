import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recuperar-pwd',
  templateUrl: './recuperar-pwd.page.html',
  styleUrls: ['./recuperar-pwd.page.scss'],
})
export class RecuperarPWDPage implements OnInit {

  recuperarForm: FormGroup;

  constructor(private alertCtrl: AlertController,
              private authService: AuthService,
              public modalCtrl: ModalController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.recuperarForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }

  recuperarPWD() {
    if (this.recuperarForm.valid) {
      const email = this.recuperarForm.controls.email.value;
      this.authService.resetPassword(email);
      this.presentAlert('Listo', 'Si tiene cuenta le enviaremos un correo de recuperación.');
      this.dismiss();
    } else {
      this.presentAlert('Algo salio mal', 'Por favor introduzca un correo valido.');
    }
  }

  async presentAlertConfirm(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Enhorabuena!',
      message: 'Se ha enviado un correo de recuperación!',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.dismiss();
          }
        }
      ]
    });
  }

  async presentAlert(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: ['Okay!']
    });

    await alert.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
