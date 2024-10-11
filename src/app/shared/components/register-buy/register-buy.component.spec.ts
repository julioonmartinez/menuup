import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBuyComponent } from './register-buy.component';

describe('RegisterBuyComponent', () => {
  let component: RegisterBuyComponent;
  let fixture: ComponentFixture<RegisterBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
