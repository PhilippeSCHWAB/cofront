import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimbddvarComponent } from './addentity.component';

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
