import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsPage } from '../modals/details/details.page';
import { EventPage } from '../modals/event/event.page';
import { Evento } from 'src/models/evento.model';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

 /*  events: Evento[] = [
    {
      id: '',
      nombre: 'Ayuda6',
      direccion: 'Lorem ipsum dolor sit amet',
      fecha: '2020-05-18',
      detalle: 'lorem ipsum dolor sit amet',
      empresa: 'Prueba1',
      horas: 20,
      espacios: 10
    },
    {
      id: '',
      nombre: 'Ayuda7',
      direccion: 'Lorem ipsum dolor sit amet',
      fecha: '2020-05-18',
      detalle: 'lorem ipsum dolor sit amet',
      empresa: 'Prueba1',
      horas: 20,
      espacios: 10
    },
    {
      id: '',
      nombre: 'Ayuda8',
      direccion: 'Lorem ipsum dolor sit amet',
      fecha: '2020-12-18',
      detalle: 'lorem ipsum dolor sit amet',
      empresa: 'Prueba1',
      horas: 20,
      espacios: 10
    },
    {
      id: '',
      nombre: 'Ayuda9',
      direccion: 'Lorem ipsum dolor sit amet',
      fecha: '2020-01-18',
      detalle: 'lorem ipsum dolor sit amet',
      empresa: 'Prueba1',
      horas: 20,
      espacios: 10
    },
    {
      id: '',
      nombre: 'Ayuda10',
      direccion: 'Lorem ipsum dolor sit amet',
      fecha: '2020-03-18',
      detalle: 'lorem ipsum dolor sit amet',
      empresa: 'Prueba1',
      horas: 20,
      espacios: 10
    },
  ]; */

  eventos: Evento[];

  suceso = [];

  constructor(public modalCtrl: ModalController,
              private eventoService: EventosService) { }

  ngOnInit() {
    // this.createEvento();
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

  /* createEvento() {
    this.events.forEach(element => {
      this.eventoService.createEvento(element);
    });
  } */

}
