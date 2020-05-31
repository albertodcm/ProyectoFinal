import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.page.html',
  styleUrls: ['./fav.page.scss'],
})
export class FavPage implements OnInit {

  status: 'ev';

  ngOnInit() {
    this.status = 'ev';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

}
