import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerResenasComponent } from './ver-resenas.component';

describe('VerResenasComponent', () => {
  let component: VerResenasComponent;
  let fixture: ComponentFixture<VerResenasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerResenasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
