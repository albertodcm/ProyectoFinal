import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../modals/details/details.page';

@Component({
  selector: 'app-org',
  templateUrl: './org.page.html',
  styleUrls: ['./org.page.scss'],
})
export class OrgPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async showDetails() {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
    });
    return await modal.present();
  }

}
