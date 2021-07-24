import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningGeographyComponent } from './learning-geography.component';

describe('LearningGeographyComponent', () => {
  let component: LearningGeographyComponent;
  let fixture: ComponentFixture<LearningGeographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningGeographyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
