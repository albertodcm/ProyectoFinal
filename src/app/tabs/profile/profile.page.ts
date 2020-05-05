import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../modals/settings/settings.page';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(public modalCtrl: ModalController,
              private userService: UserService,
              public fAuth: AngularFireAuth) {
              const userlog = this.fAuth.auth.currentUser;
              console.log('entro a prfie');


    }


  ngOnInit() {
    const sessionUser = JSON.parse(localStorage.getItem('user'));
    console.log(sessionUser.uid); // esto es lo que se necesita para sacar el usuario de firebase
    this.userService.getUser(sessionUser.uid);
  }


  async showSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
    });
    return await modal.present();
  }

  // getUser() {
  //   return this.userService;
  //   console.log(this.userService);
  // }



}
