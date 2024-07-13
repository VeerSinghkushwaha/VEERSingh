import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmasterFormComponent } from './gmaster-form.component';

describe('GmasterFormComponent', () => {
  let component: GmasterFormComponent;
  let fixture: ComponentFixture<GmasterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GmasterFormComponent]
    });
    fixture = TestBed.createComponent(GmasterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
