import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostdnReplyComponent } from './costdn-reply.component';

describe('CostdnReplyComponent', () => {
  let component: CostdnReplyComponent;
  let fixture: ComponentFixture<CostdnReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostdnReplyComponent]
    });
    fixture = TestBed.createComponent(CostdnReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
