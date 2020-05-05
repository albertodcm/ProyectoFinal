import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NavController, AlertController } from '@ionic/angular';
import { take, map, tap } from 'rxjs/operators';

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

    return this.authService.user$.pipe(
      take(1),
      map(user => user ? true : false),
      tap(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          this.presentAlertConfirm('Espera!', 'Para ingresar a "Mi perfil" tienes que ingresar una cuenta!');
          return false;
        }
      })
    );
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
