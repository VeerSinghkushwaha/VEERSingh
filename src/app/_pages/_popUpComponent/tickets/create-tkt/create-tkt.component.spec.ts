import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTktComponent } from './create-tkt.component';

describe('CreateTktComponent', () => {
  let component: CreateTktComponent;
  let fixture: ComponentFixture<CreateTktComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTktComponent]
    });
    fixture = TestBed.createComponent(CreateTktComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
