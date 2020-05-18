import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from 'src/models/evento.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  evento: Evento;

  constructor(public modalCtrl: ModalController,
              private navParams: NavParams,
              private eventoService: EventosService,
              private navCtrl: NavController) { }

  ngOnInit() {
    const id = this.navParams.get('eventoId');
    if (id) {
      this.getEvento(id);
    } else {
      this.navCtrl.navigateRoot('tabs/home');
    }
  }

  dismiss() {
    console.log(' Entro al dismiss ');
    this.modalCtrl.dismiss();
  }

  getEvento(eventId: string) {
    this.eventoService.getEvento(eventId).subscribe((evento: Evento) => {
      this.evento = evento;
    })
  }


}
