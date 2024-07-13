import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TktLogComponent } from './tkt-log.component';

describe('TktLogComponent', () => {
  let component: TktLogComponent;
  let fixture: ComponentFixture<TktLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TktLogComponent]
    });
    fixture = TestBed.createComponent(TktLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
