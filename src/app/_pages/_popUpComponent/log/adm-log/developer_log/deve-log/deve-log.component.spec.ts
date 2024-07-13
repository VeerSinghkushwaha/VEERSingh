import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveLogComponent } from './deve-log.component';

describe('DeveLogComponent', () => {
  let component: DeveLogComponent;
  let fixture: ComponentFixture<DeveLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveLogComponent]
    });
    fixture = TestBed.createComponent(DeveLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
