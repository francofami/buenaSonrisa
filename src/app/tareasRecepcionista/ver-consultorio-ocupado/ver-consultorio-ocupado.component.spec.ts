import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerConsultorioOcupadoComponent } from './ver-consultorio-ocupado.component';

describe('VerConsultorioOcupadoComponent', () => {
  let component: VerConsultorioOcupadoComponent;
  let fixture: ComponentFixture<VerConsultorioOcupadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerConsultorioOcupadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerConsultorioOcupadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
