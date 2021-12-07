import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAJobComponent } from './create-a-job.component';

describe('CreateAJobComponent', () => {
  let component: CreateAJobComponent;
  let fixture: ComponentFixture<CreateAJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
