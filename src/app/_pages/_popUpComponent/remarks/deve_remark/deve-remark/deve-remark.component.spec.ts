import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveRemarkComponent } from './deve-remark.component';

describe('DeveRemarkComponent', () => {
  let component: DeveRemarkComponent;
  let fixture: ComponentFixture<DeveRemarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveRemarkComponent]
    });
    fixture = TestBed.createComponent(DeveRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
