import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveReplyComponent } from './deve-reply.component';

describe('DeveReplyComponent', () => {
  let component: DeveReplyComponent;
  let fixture: ComponentFixture<DeveReplyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveReplyComponent]
    });
    fixture = TestBed.createComponent(DeveReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
