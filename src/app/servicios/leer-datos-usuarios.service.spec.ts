import { TestBed } from '@angular/core/testing';

import { LeerDatosUsuariosService } from './leer-datos-usuarios.service';

describe('LeerDatosUsuariosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeerDatosUsuariosService = TestBed.get(LeerDatosUsuariosService);
    expect(service).toBeTruthy();
  });
});
