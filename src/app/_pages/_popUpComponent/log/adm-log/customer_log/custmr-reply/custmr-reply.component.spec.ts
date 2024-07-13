import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmrReplyComponent } from './custmr-reply.component';

describe('CustmrReplyComponent', () => {
  let component: CustmrReplyComponent;
  let fixture: ComponentFixture<CustmrReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmrReplyComponent]
    });
    fixture = TestBed.createComponent(CustmrReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
