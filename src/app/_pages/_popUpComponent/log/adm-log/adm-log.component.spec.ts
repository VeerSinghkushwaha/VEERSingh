import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmLogComponent } from './adm-log.component';

describe('AdmLogComponent', () => {
  let component: AdmLogComponent;
  let fixture: ComponentFixture<AdmLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmLogComponent]
    });
    fixture = TestBed.createComponent(AdmLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
