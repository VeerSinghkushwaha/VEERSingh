import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmrStatusComponent } from './custmr-status.component';

describe('CustmrStatusComponent', () => {
  let component: CustmrStatusComponent;
  let fixture: ComponentFixture<CustmrStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmrStatusComponent]
    });
    fixture = TestBed.createComponent(CustmrStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
