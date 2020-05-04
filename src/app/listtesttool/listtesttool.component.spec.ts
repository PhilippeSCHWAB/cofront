import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilDeTestlistComponent } from './listtesttool.component';

describe('OutilDeTestListComponent', () => {
  let component: OutilDeTestlistComponent;
  let fixture: ComponentFixture<OutilDeTestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutilDeTestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutilDeTestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
