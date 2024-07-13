import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmrTktComponent } from './custmr-tkt.component';

describe('CustmrTktComponent', () => {
  let component: CustmrTktComponent;
  let fixture: ComponentFixture<CustmrTktComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmrTktComponent]
    });
    fixture = TestBed.createComponent(CustmrTktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
