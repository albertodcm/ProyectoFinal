import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams, AlertController } from '@ionic/angular';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/models/empresa.model';
import { AcercadePage } from 'src/app/Modals/acercade/acercade.page';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  empresa: Empresa;
  celular
  correo
  telefono

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
    this.modalCtrl.dismiss();
  }

  getEmpresa(orgId: string) {
    this.empresaService.getEmpresa(orgId).subscribe((empresa: Empresa) => {
      this.empresa = empresa;
      this.telefono = empresa.telefono
      this.correo = empresa.correo
      this.celular = empresa.celular
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

  openCall(){
    window.location.href="tel:" + this.telefono;
  }

  openMail(){
    window.location.href="mailto::" + this.correo;
  }

  openWhatsapp(){	
    window.location.href = "https://wa.me/" + this.celular;
  }

}
