import {inject, TestBed} from '@angular/core/testing';

import {GroupRoleService} from './group-role.service';

describe('GroupRoleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupRoleService]
    });
  });

  it('should be created', inject([GroupRoleService], (service: GroupRoleService) => {
    expect(service).toBeTruthy();
  }));
});
