import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/models/empresa.model';
import { AcercadePage } from '../acercade/acercade.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  empresa: Empresa;

  constructor(public modalCtrl: ModalController,
              private navParams: NavParams,
              private navCtrl: NavController,
              private empresaService: EmpresaService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    const id = this.navParams.get('orgId');
    if (id) {
      this.getEmpresa(id);
    } else {
      this.navCtrl.navigateRoot('tabs/org');
    }
  }

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }

  getEmpresa(orgId: string) {
    this.empresaService.getEmpresa(orgId).subscribe((empresa: Empresa) => {
      this.empresa = empresa;
    })
  }

  async showAcerca(orgId: string) {
    const modal = await this.modalCtrl.create({
      component: AcercadePage,
      componentProps: {
        orgId
      }
    });
    return await modal.present();
  }

  async presentInfo(titulo: string, body: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: body,
      buttons: [
        {
          text: 'Entendido!'
        }
      ]
    });

    await alert.present();
  }

}
