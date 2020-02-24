import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeealertComponent } from './employeealert.component';

describe('EmployeealertComponent', () => {
  let component: EmployeealertComponent;
  let fixture: ComponentFixture<EmployeealertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeealertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeealertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
