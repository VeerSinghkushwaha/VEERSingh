import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EMasterComponent } from './e-master.component';

describe('EMasterComponent', () => {
  let component: EMasterComponent;
  let fixture: ComponentFixture<EMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EMasterComponent]
    });
    fixture = TestBed.createComponent(EMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
