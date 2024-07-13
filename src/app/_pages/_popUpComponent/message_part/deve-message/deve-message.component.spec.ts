import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveMessageComponent } from './deve-message.component';

describe('DeveMessageComponent', () => {
  let component: DeveMessageComponent;
  let fixture: ComponentFixture<DeveMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveMessageComponent]
    });
    fixture = TestBed.createComponent(DeveMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
