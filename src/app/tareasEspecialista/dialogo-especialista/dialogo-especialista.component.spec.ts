import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoEspecialistaComponent } from './dialogo-especialista.component';

describe('DialogoEspecialistaComponent', () => {
  let component: DialogoEspecialistaComponent;
  let fixture: ComponentFixture<DialogoEspecialistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoEspecialistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
