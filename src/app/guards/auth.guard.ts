import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad {

  constructor(private authService: AuthService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.presentAlertConfirm('Espera!', 'Para ingresar a "Mi perfil" tienes que ingresar una cuenta!');
      return false;
    }
    return true;
  }

  async presentAlertConfirm(title: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: body,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            this.navCtrl.navigateRoot(['tabs/home']);
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.navCtrl.navigateRoot(['/login']);
          }
        },
      ]
    });

    await alert.present();
  }
}
