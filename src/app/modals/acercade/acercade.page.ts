import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Empresa } from 'src/models/empresa.model';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage implements OnInit {

  empresa: Empresa;

  constructor(private modalCtrl: ModalController,
              private navParams: NavParams,
              private empresaService: EmpresaService,
              private navCtrl: NavController) { }

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
    });
  }



}
