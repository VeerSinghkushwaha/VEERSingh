import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustdnLogComponent } from './custdn-log.component';

describe('CustdnLogComponent', () => {
  let component: CustdnLogComponent;
  let fixture: ComponentFixture<CustdnLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustdnLogComponent]
    });
    fixture = TestBed.createComponent(CustdnLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
