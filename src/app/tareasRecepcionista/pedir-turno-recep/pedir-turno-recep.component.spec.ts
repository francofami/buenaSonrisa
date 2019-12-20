import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedirTurnoRecepComponent } from './pedir-turno-recep.component';

describe('PedirTurnoRecepComponent', () => {
  let component: PedirTurnoRecepComponent;
  let fixture: ComponentFixture<PedirTurnoRecepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedirTurnoRecepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedirTurnoRecepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
