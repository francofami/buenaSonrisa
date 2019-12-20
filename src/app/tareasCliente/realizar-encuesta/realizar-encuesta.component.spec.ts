import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarEncuestaComponent } from './realizar-encuesta.component';

describe('RealizarEncuestaComponent', () => {
  let component: RealizarEncuestaComponent;
  let fixture: ComponentFixture<RealizarEncuestaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarEncuestaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
