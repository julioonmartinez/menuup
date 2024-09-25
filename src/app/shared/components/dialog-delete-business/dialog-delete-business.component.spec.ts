import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteBusinessComponent } from './dialog-delete-business.component';

describe('DialogDeleteBusinessComponent', () => {
  let component: DialogDeleteBusinessComponent;
  let fixture: ComponentFixture<DialogDeleteBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
