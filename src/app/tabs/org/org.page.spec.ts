import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrgPage } from './org.page';

describe('OrgPage', () => {
  let component: OrgPage;
  let fixture: ComponentFixture<OrgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
