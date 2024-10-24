import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddressEditComponent } from './dialog-address-edit.component';

describe('DialogAddressEditComponent', () => {
  let component: DialogAddressEditComponent;
  let fixture: ComponentFixture<DialogAddressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddressEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
