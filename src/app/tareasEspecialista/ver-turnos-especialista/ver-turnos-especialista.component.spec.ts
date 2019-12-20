import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTurnosEspecialistaComponent } from './ver-turnos-especialista.component';

describe('VerTurnosEspecialistaComponent', () => {
  let component: VerTurnosEspecialistaComponent;
  let fixture: ComponentFixture<VerTurnosEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerTurnosEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
