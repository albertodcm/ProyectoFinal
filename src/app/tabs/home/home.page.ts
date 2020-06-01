import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventPage } from '../modals/event/event.page';
import { Evento } from 'src/models/evento.model';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  eventos: Evento[];
  suceso = [];

  constructor(public modalCtrl: ModalController,
              private eventoService: EventosService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
    this.eventoService.getEventos().subscribe((suceso: Evento[]) => {
      this.eventos = suceso;
      console.log(this.eventos.length);
    });
  }

  search(event: any) {
    const eve = event.detail.value;
    if ( eve.length > 0) {
      this.eventoService.searchEvento(eve).subscribe((eventos) => {
        this.suceso = eventos;
      });
    } else {
      this.suceso = [];
    }
  }

  async eventoDetails(eventoId: string) {
    const modal = await this.modalCtrl.create({
      component: EventPage,
      componentProps: {
        eventoId
      }
    });
    return await modal.present();
  }
}
