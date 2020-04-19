import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserchainComponent } from './userchain.component';

describe('UserchainComponent', () => {
  let component: UserchainComponent;
  let fixture: ComponentFixture<UserchainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserchainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserchainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
