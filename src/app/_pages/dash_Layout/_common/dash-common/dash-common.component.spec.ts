import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCommonComponent } from './dash-common.component';

describe('DashCommonComponent', () => {
  let component: DashCommonComponent;
  let fixture: ComponentFixture<DashCommonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashCommonComponent]
    });
    fixture = TestBed.createComponent(DashCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
