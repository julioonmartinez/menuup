import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutWelcomeComponent } from './layout-welcome.component';

describe('LayoutWelcomeComponent', () => {
  let component: LayoutWelcomeComponent;
  let fixture: ComponentFixture<LayoutWelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutWelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
