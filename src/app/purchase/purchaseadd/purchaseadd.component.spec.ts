import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { PurchaseaddComponent } from './purchaseadd.component';

describe('PurchaseaddComponent', () => {
  let component: PurchaseaddComponent;
  let fixture: ComponentFixture<PurchaseaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseaddComponent ]
    })
    .compileComponents();
  }));


describe('PurchaseaddComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PurchaseaddComponent],
            imports: [ReactiveFormsModule],  // Also add it to 'imports' array
        })
        .compileComponents();
    }));
});
  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
