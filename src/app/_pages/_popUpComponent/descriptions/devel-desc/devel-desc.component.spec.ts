import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelDescComponent } from './devel-desc.component';

describe('DevelDescComponent', () => {
  let component: DevelDescComponent;
  let fixture: ComponentFixture<DevelDescComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevelDescComponent]
    });
    fixture = TestBed.createComponent(DevelDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
