import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainComponent } from './addchain.component';

describe('ChainComponent', () => {
  let component: ChainComponent;
  let fixture: ComponentFixture<ChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
