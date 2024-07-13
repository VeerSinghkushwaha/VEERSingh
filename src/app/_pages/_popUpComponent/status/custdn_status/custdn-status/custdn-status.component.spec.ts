import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustdnStatusComponent } from './custdn-status.component';

describe('CustdnStatusComponent', () => {
  let component: CustdnStatusComponent;
  let fixture: ComponentFixture<CustdnStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustdnStatusComponent]
    });
    fixture = TestBed.createComponent(CustdnStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
