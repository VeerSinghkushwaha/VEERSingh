import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserGenericComponent } from './add-user-generic.component';

describe('AddUserGenericComponent', () => {
  let component: AddUserGenericComponent;
  let fixture: ComponentFixture<AddUserGenericComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserGenericComponent]
    });
    fixture = TestBed.createComponent(AddUserGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
