import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustmrLogComponent } from './custmr-log.component';

describe('CustmrLogComponent', () => {
  let component: CustmrLogComponent;
  let fixture: ComponentFixture<CustmrLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustmrLogComponent]
    });
    fixture = TestBed.createComponent(CustmrLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
