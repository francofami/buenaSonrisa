import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConsultorioProximoAOcuparComponent } from './ver-consultorio-proximo-aocupar.component';

describe('VerConsultorioProximoAOcuparComponent', () => {
  let component: VerConsultorioProximoAOcuparComponent;
  let fixture: ComponentFixture<VerConsultorioProximoAOcuparComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultorioProximoAOcuparComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultorioProximoAOcuparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
