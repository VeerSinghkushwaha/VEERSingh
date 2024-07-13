import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusComponent } from './admin-status.component';

describe('AdminStatusComponent', () => {
  let component: AdminStatusComponent;
  let fixture: ComponentFixture<AdminStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminStatusComponent]
    });
    fixture = TestBed.createComponent(AdminStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
