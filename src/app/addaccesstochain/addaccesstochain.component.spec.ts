import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimbddvarComponent } from './addaccesstochain.component';

describe('AlimbddvarComponent', () => {
  let component: AlimbddvarComponent;
  let fixture: ComponentFixture<AlimbddvarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimbddvarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimbddvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
