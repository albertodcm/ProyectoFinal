import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public modalCtrl: ModalController,
              private authService: AuthService,
              private navCtrl: NavController) { }

  ngOnInit() {
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

}
