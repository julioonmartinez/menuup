import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConditionsComponent } from './dialog-conditions.component';

describe('DialogConditionsComponent', () => {
  let component: DialogConditionsComponent;
  let fixture: ComponentFixture<DialogConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogConditionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
