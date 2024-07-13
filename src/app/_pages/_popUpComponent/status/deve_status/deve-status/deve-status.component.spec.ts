import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveStatusComponent } from './deve-status.component';

describe('DeveStatusComponent', () => {
  let component: DeveStatusComponent;
  let fixture: ComponentFixture<DeveStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveStatusComponent]
    });
    fixture = TestBed.createComponent(DeveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
