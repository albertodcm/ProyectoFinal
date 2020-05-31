import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../modals/settings/settings.page';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User;

  constructor(public modalCtrl: ModalController,
              private authService: AuthService) {
    }


  ngOnInit() {
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }


  async showSettings(userid: string) {
    const modal = await this.modalCtrl.create({
      component: SettingsPage,
      componentProps: {
        userid
      }
    });
    return await modal.present();
  }

  UserDelete() {
    
  }



}
