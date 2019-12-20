import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreCancelarComponent } from './pre-cancelar.component';

describe('PreCancelarComponent', () => {
  let component: PreCancelarComponent;
  let fixture: ComponentFixture<PreCancelarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreCancelarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
