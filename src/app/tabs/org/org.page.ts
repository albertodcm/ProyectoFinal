import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../modals/details/details.page';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/models/empresa.model';

@Component({
  selector: 'app-org',
  templateUrl: './org.page.html',
  styleUrls: ['./org.page.scss'],
})
export class OrgPage implements OnInit {

  organizaciones: Empresa[];
  orgs = [];

  constructor(public modalCtrl: ModalController,
              private empresaService: EmpresaService) { }

  ngOnInit() {
    this.getEmpresas();
  }

  async showDetails(orgId: string) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps: {
        orgId
      }
    });
    return await modal.present();
  }

  getEmpresas() {
    this.empresaService.getEmpresas().subscribe((orgs: Empresa[]) => {
      this.organizaciones = orgs;
    });
  }

  search(event: any) {
    const org = event.detail.value;
    if ( org.length > 0) {
      this.empresaService.searchEmpresa(org).subscribe((empresas) => {
        this.orgs = empresas;
      });
    } else {
      this.orgs = [];
    }
  }
}
