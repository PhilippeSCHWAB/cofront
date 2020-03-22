import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeurunixlistComponent } from './serveurunixlist.component';

describe('EntityListComponent', () => {
  let component: ServeurunixlistComponent;
  let fixture: ComponentFixture<ServeurunixlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServeurunixlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServeurunixlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
