import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VencustAlertComponent } from './vencust-alert.component';

describe('VencustAlertComponent', () => {
  let component: VencustAlertComponent;
  let fixture: ComponentFixture<VencustAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VencustAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VencustAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
