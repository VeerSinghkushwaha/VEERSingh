import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmActionComponent } from './adm-action.component';

describe('AdmActionComponent', () => {
  let component: AdmActionComponent;
  let fixture: ComponentFixture<AdmActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmActionComponent]
    });
    fixture = TestBed.createComponent(AdmActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
