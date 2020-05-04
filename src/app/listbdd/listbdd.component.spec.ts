import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BddlistparamComponent } from './listbdd.component';

describe('BddListParamComponent', () => {
  let component:BddlistparamComponent;
  let fixture: ComponentFixture<BddlistparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BddlistparamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BddlistparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
