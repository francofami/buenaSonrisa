import { TestBed, async, inject } from '@angular/core/testing';

import { TipoUsuarioGuard } from './tipo-usuario.guard';

describe('TipoUsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoUsuarioGuard]
    });
  });

  it('should ...', inject([TipoUsuarioGuard], (guard: TipoUsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
