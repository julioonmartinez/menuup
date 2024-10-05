import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPlanComponent } from './selection-plan.component';

describe('SelectionPlanComponent', () => {
  let component: SelectionPlanComponent;
  let fixture: ComponentFixture<SelectionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
