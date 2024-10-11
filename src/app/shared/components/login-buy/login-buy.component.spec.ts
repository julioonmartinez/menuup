import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBuyComponent } from './login-buy.component';

describe('LoginBuyComponent', () => {
  let component: LoginBuyComponent;
  let fixture: ComponentFixture<LoginBuyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBuyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
